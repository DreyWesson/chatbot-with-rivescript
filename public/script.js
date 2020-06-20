let bot = new RiveScript();

const message_container = document.querySelector(".messages");
const form = document.querySelector("form");
const input_box = document.querySelector("input");

window.addEventListener("load", (event) => {
  input_box.focus();
});

const brains = ["./brain.rive"];

(async function () {
  await bot.loadFile(brains).then(botReady).catch(botNotReady);
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = "";
});

async function selfReply(message) {
  message_container.innerHTML += `<div class="self">${message}</div>`;
  location.href = "#edge";

  await bot.reply("local-user", message).then((reply) => {
    botReply(reply);
  });
}

function botReply(message) {
  message_container.innerHTML += `<div class="typing-loader"></div>`;
  setTimeout(() => {
    const loader = document.querySelector(".typing-loader");
    loader.remove();
    message_container.innerHTML += `<div class="bot">${message}</div>`;
    location.href = "#edge";
    input_box.focus();
  }, 500);
}

async function botReady() {
  await bot.sortReplies();
  botReply("Hello");
}

function botNotReady(err) {
  console.log("An error has occurred.", err);
}
