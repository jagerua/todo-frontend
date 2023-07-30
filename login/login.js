const submitButton = document.querySelectorAll('.formBtn');

const inputUserName = document.querySelector('#userName');
const inputEmailSignup = document.querySelector('#emailSignup');
const inputPasswordSignup = document.querySelector('#passwordSignup');

// Get value form Login form
const inputEmailLogin = document.querySelector('#emailLogin');
const inputPasswordLogin = document.querySelector('#passwordLogin');

submitButton.forEach((button) => {
  button.addEventListener('mouseup', () => {

    if (inputEmailLogin && inputEmailLogin.value && inputPasswordLogin.value) {
      const emailValue = inputEmailLogin.value;
      const passwordValue = inputPasswordLogin.value;

      const signupData = {email: emailValue, password: passwordValue};
      
      window.fetchService.loginHandler(signupData)
        .then((res) => res.json())
        .then((data) => {
            window.authData = data;
            login(data);
            localStorage.setItem('authData', JSON.stringify(data));
            localStorage.setItem('token', data.token);// to get localStorage.getItem('userData')
        });
    }
  });
});

// Get value form Signup form
submitButton.forEach((button) => {
  button.addEventListener('mouseup', () => {

    if (inputEmailSignup && inputEmailSignup.value && inputPasswordSignup.value) {
      const userValue = inputUserName.value;
      const emailSignup = inputEmailSignup.value;
      const passwordSignup = inputPasswordSignup.value;

      const loginData = {name: userValue, email: emailSignup, password: passwordSignup};
      console.log("Data: ", loginData);

      fetchService.signupHandler(loginData)
        .then((res) => res.json())
        .then((data) => console.log("Error: ", data));
    }
  });
});

// 
function login (data) {
  const wellcome = document.querySelector('.wellcome');
  const loginWindow = document.querySelector('.wrapper-login');

  if (!data) return alert('Something went wrong!');

    loginWindow.style.opacity = '0';
    wellcome.style.visibility = 'visible';

    setTimeout(()=> {
      wellcome.style.visibility = 'hidden';
    }, 1000);

    setTimeout(()=> {
      window.location.href = '../dashboard.html';
    }, 1600);

};