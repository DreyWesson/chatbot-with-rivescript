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

function selfReply(message) {
  if (message) {
    isNaN(message)
      ? checkContent(message)
      : botReply("Oh, not numbers again. I'm not good with it!!!");
  } else {
    botReply("Say something. I can't read your mind...yet");
  }

  async function checkContent() {
    message_container.innerHTML += `<div class="self">${message}</div>`;
    location.href = "#edge";
    await bot.reply("local-user", message).then((reply) => {
      botReply(reply);
    });
  }
}

function botReply(message) {
  message_container.innerHTML += `<div class="typing-loader"></div>`;
  setTimeout(() => {
    //Create a loader to give a bot typing feel
    const loader = document.querySelector(".typing-loader");
    loader.remove();
    message_container.innerHTML += `<div class="bot">${message}</div>`;
    const botMsg = [...document.querySelectorAll(".bot")];
    botMsg.forEach((msg) => {
      botMsg[botMsg.length - 1].scrollTo(0, -500);
    });
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
