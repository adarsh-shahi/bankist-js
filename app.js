const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const currentBalanceDisplay = function (account) {
	account.balance = account.movements.reduce((total, mov) => {
		return total + mov;
	}, 0);
	labelBalance.textContent = `${account.balance}€`;
};

const displayMovements = function (movements, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? movements.slice().sort((a, b) => {
		return a - b  // Ascending   
	}) : movements

	movs.forEach(function (mov, i) {
		const type = mov > 0 ? "deposit" : "withdrawal";
		const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov} €</div>
  </div>`;

		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

const calcSummaryDisplay = function (account) {
	const totalDeposits = account.movements
		.filter((mov) => {
			return mov > 0;
		})
		.reduce((acc, mov) => {
			return acc + mov;
		}, 0);

	const totalWithdrawal = Math.abs(
		account.movements
			.filter((mov) => {
				return mov < 0;
			})
			.reduce((acc, mov) => {
				return acc + mov;
			}, 0)
	);

	const interest = account.movements
		.filter((mov) => {
			return mov > 0;
		})
		.map((deposit) => {
			return (deposit * account.interestRate) / 100;
		})
		.filter((int, i, arr) => {
			return int >= 1;
		})
		.reduce((acc, ins) => {
			return acc + ins;
		});

	labelSumIn.textContent = Math.trunc(totalDeposits) + "€";
	labelSumOut.textContent = Math.trunc(totalWithdrawal) + "€";
	labelSumInterest.textContent = interest;
};

const createUsernames = function (accounts) {
	accounts.forEach((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(" ")
			.map((name) => {
				return name[0];
			})
			.join("");
	});
};

createUsernames(accounts);
console.log(accounts);

const updateUI = function (currentUser) {
	displayMovements(currentUser.movements);
	currentBalanceDisplay(currentUser);
	calcSummaryDisplay(currentUser);
};

// LOGIN
let currentUser = "";

//Fake always logged in
currentUser = account1;
updateUI(currentUser)
containerApp.style.opacity = 100

const now = new Date()

labelDate.textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`

btnLogin.addEventListener("click", function (e) {
	e.preventDefault(); //prevent form from submitting
	currentUser = accounts.find((acc) => {
		return (
			inputLoginUsername.value.trim() === acc.username &&
			Number(inputLoginPin.value) === acc.pin
		);
	});
	if (currentUser) {
		inputLoginUsername.value = "";
		inputLoginPin.value = "";
		inputLoginPin.blur(); // loses its focus

		labelWelcome.textContent = `Welocme back, ${
			currentUser.owner.split(" ")[0]
		}`;
		containerApp.style.opacity = 100;
		updateUI(currentUser);
	} else {
		labelWelcome.textContent = `Wrong Credentials`;
		containerApp.style.opacity = 0;
	}
});

const euroToUsd = 1.1;

const movementsUSD = account1.movements.map((mov) => {
	return Math.trunc(mov * euroToUsd);
});

console.log(movementsUSD);

btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();
	const sendTo = inputTransferTo.value;
	const sendAmount = Number(inputTransferAmount.value);
	const user = accounts.find((account) => {
		return (
			account.username === sendTo && account.username !== currentUser.username
		);
	});
	if (user) {
		console.log(currentUser, user);
		if (currentUser.balance - sendAmount >= 0 && sendAmount > 0) {
			currentUser.balance -= sendAmount;
			currentUser.movements.push(-sendAmount);
			user.balance += sendAmount;
			user.movements.push(sendAmount);
			updateUI(currentUser);
		} else {
			console.log(`Insufficient balance`);
		}
	} else {
		console.log(`Cannot find user`);
	}
	inputTransferTo.value = "";
	inputTransferAmount.value = "";
	inputTransferAmount.blur();
});

btnClose.addEventListener("click", (e) => {
	e.preventDefault();

	const user = inputCloseUsername.value;
	const pin = Number(inputClosePin.value);
	if (user === currentUser.username && pin === currentUser.pin) {
		const accIndex = accounts.findIndex((acc) => {
			return user === acc.username && pin === acc.pin;
		});
		accounts.splice(accIndex, 1); // delete account
		inputCloseUsername.value = "";
		inputClosePin.value = "";
		inputClosePin.blur();
		containerApp.style.opacity = 0;
	}
});

btnLoan.addEventListener("click", (e) => {
	e.preventDefault();
	const loanAmount = Number(inputLoanAmount.value);
	const isLoanValid =
		loanAmount > 0 &&
		currentUser.movements.some((mov) => {
			// some returns either true or false
			return mov >= (10 / 100) * loanAmount;
		});
	if (isLoanValid) {
		currentUser.balance += loanAmount;
		currentUser.movements.push(loanAmount);
		updateUI(currentUser);
	} else {
		console.log("Reduce loan amount");
	}
	inputLoanAmount.value = ''
	inputLoanAmount.blur()
});
 
const totalBalance = accounts
	.map((acc) => {
		return acc.movements;
	})
	.flat()
	.reduce((acc, mov) => {
		return acc + mov;
	}, 0);
console.log(totalBalance);

const totalBalance2 = accounts
	.flatMap((acc) => {
		return acc.movements;
	})
	.reduce((acc, mov) => {
		return acc + mov;
	}, 0);
console.log(totalBalance); 

let sortState = false;
btnSort.addEventListener('click', e => {
	e.preventDefault();
	displayMovements(currentUser.movements, !sortState)
})


labelBalance.addEventListener('click', () => {
	const z = Array.from(document.querySelectorAll('.movements_value'));
	console.log(z);
})
