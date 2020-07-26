const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
let userName;

socket.on('message', ({ author, content }) => addMessage(author, content))

socket.on('join', ({ name }) =>
  addMessage('Chat Bot', `${name} has joined the chat`)
);
socket.on('removeUser', ({ name }) =>
  addMessage('Chat Bot', `${name} has left the chat`)
);

const login = event => {
  event.preventDefault();

  if(userNameInput.value == '') {
    window.alert('Username is missing!!!');
  } else{
    userName = userNameInput.value;
    console.log(userName);

    loginForm.classList.toggle('show');
    messagesSection.classList.toggle('show');
    socket.emit('join', {
      name: userName,
      id: socket.id
    });
  }
}
loginForm.addEventListener('submit', login);


const sendMessage = event => {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if (messageContent == '') {
    window.alert('Message is missing');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContent = '';
  }
}
addMessageForm.addEventListener('submit', sendMessage);


const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author == userName) {
    message.classList.add('message--self');
  } else if (author == 'Chat Bot') {
    message.classList.add('message--info');
  }
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'YOU' : author}</h3>
    <div class="message__content">
      ${content}
    </div>`;
  
  messagesList.appendChild(message);
}