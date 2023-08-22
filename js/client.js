const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".container");
const userNameForm = document.getElementById("userNameForm");
const userNameInp = document.getElementById("userName");
const chat = document.querySelector(".main-chat");
const userNameBox = document.querySelector(".name-inp");
const mainContainer = document.querySelector(".main-container");

const append = (message, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = message;
  msgElement.classList.add("message");
  msgElement.classList.add(position);
  msgContainer.appendChild(msgElement);
};

userNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = userNameInp.value;
  chat.style.display = "block";
  userNameBox.style.display = "none";
  mainContainer.style.justifyContent = "space-between";

  socket.emit("new-user-joined", userName);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInp.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  msgInp.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.userName}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
