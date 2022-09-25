const user = document.querySelector('.login__input--user');
const pin = document.querySelector('.login__input--pin');

// user.addEventListener('change', () => {
//   user.value = 
// })



document.querySelector('.login__btn').addEventListener('click', function() {
  console.log(user.value, pin.value);
  if(user.value === 'js' && pin.value === '1111'){
    console.log('Logged in');
  }
  else if(user.value === 'jd' && pin.value === '2222'){
    console.log('Logged in');
  }
  else console.log('Wrong Credentials');
})