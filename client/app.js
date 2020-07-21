const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-section__list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message__content');

let userName;

loginForm.addEventListener('submit', login);

const login = event => {
  event.preventDefault();

  if(userNameInput.innerHTML == '') {
    window.alert('Username is missing!!!');
  } else{
    userName = userNameInput.innerHTML;
    console.log(userName);

    userNameInput.classList.toggle('show');
    messagesSection.classList.toggle('show');
  }
}