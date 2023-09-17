const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".container");
const userNameForm = document.getElementById("userNameForm");
const userNameInp = document.getElementById("userName");
const mainChat = document.querySelector(".main-chat");
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
  mainChat.style.display = "flex";
  mainChat.style.flexDirection = "column";
  mainChat.style.width = "80%";
  mainChat.style.margin = "0 auto";
  mainChat.style.rowGap = "50px";
  userNameBox.style.display = "none";
  mainContainer.style.justifyContent = "space-between";

  socket.emit("new-user-joined", userName);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInp.value;
  append(`You: ${message}`, "msg-right");
  socket.emit("send", message);
  msgInp.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "msg-right");
});

socket.on("receive", (data) => {
  append(`${data.userName}: ${data.message}`, "msg-left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, ",msg-left");
});
