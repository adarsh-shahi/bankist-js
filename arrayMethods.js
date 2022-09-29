const dogs = [
	{
		weight: 22,
		curFood: 250,
		owners: ["Alice", "Bob"],
	},
	{
		weight: 8,
		curFood: 200,
		owners: ["Matilda"],
	},
	{
		weight: 13,
		curFood: 275,
		owners: ["Sarah", "John"],
	},
	{
		weight: 32,
		curFood: 340,
		owners: ["Michael"],
	},
];


const recommendedFood = function () {
	dogs.forEach((dog) => {
		dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
	});
};

const findSarahDog = function () {
	const sarahDog = dogs.find((dog) => {
		return dog.owners.includes("Sarah");
	});
	if (sarahDog) {
		const lowerRange = sarahDog.recommendedFood * 0.9;
		const upperRange = sarahDog.recommendedFood * 1.1;
		console.log(`Sarah Dog is eating too ${sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'}`);
	} else console.log(`Sarah Dog not found`);
};

let ownersEatTooMuch = []
const ownersDogEatTooMuch = function () {
	console.log('Inside owners dog that eat too much');
	 ownersEatTooMuch = dogs
		.filter((dog) => {
			return dog.curFood > dog.recommendedFood * 1.1;
		})
		.reduce((acc, dog) => {
			return acc.concat(dog.owners);
		}, []);
	console.log(ownersEatTooMuch);
};

let ownersEatTooLittle = []
const ownersDogEatTooLittle = function () {
	console.log('Inside owners dog that eat too little');
	 ownersEatTooLittle = dogs
		.filter((dog) => {
			return dog.curFood < dog.recommendedFood * 0.9;
		})
		.reduce((acc, dog) => {
			return acc.concat(dog.owners);
		}, []);
	console.log(ownersEatTooLittle);
};

const displayMsg = function(much, little) {
  console.log(`${much.join(' and ')}'s dogs eat too much`);
  console.log(`${little.join(' and ')}'s dogs eat too little`);
}

recommendedFood();

// Exact Amount of Food
console.log(dogs.some(dog => {
  return dog.curFood === dog.recommendedFood 
}));

// OKAY Amount of Food
console.log(dogs.some(dog => {
  return dog.curFood <= dog.recommendedFood * 1.1 && dog.curFood >= dog.recommendedFood * 0.9
}));

const okayAmountofFood = function(){
  const dogsEatingOkay = dogs.filter(dog => {
    return dog.curFood <= dog.recommendedFood * 1.1 && dog.curFood >= dog.recommendedFood * 0.9
  })
  console.log(dogsEatingOkay);
}

const sortByRecommendedFood = function(){
  const dogsCopy = dogs.slice()
  dogsCopy.sort((a, b) => {
    return a.recommendedFood - b.recommendedFood
  })
  console.log(dogsCopy);
}

sortByRecommendedFood()
okayAmountofFood()
findSarahDog()
ownersDogEatTooMuch()
ownersDogEatTooLittle()
displayMsg(ownersEatTooMuch, ownersEatTooLittle)