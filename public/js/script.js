let bot = new RiveScript();
const brains = ["../brain.rive"];

const message_container = document.querySelector(".messages");
const form = document.querySelector("form");
const input_box = document.querySelector("input");

//Sound effect for typing
// const replySound = new Audio("./sounds/reply_notification.mp3");
const sendSound = new Audio("./sounds/send_notification.mp3");

window.addEventListener("load", (event) => {
  input_box.focus();
});

(async function () {
  await bot.loadFile(brains).then(botReady).catch(botNotReady);
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = "";
});

function selfReply(message) {
  //
  // Check if message is not empty
  if (message) {
    //
    // check if message is not a number
    if (isNaN(message)) {
      function remove(textToFilter) {
        var msgArray = message.split(" ");
        const index = msgArray.indexOf(textToFilter);
        msgArray.splice(index, 1);
        return msgArray.join(" ");
      }
      // logic for twitter
      if (message.indexOf("#twitterbot") !== -1) {
        setTimeout(() => {
          // filterMessage();
          remove("#twitterbot");
          botReply("This is peoples opinion");
        }, 2000);
      } else if (message.indexOf("#moodsync") !== -1) {
        // logic for unsplash pictures
        (function unsplashLogic() {
          message_container.innerHTML += `<div class="typing-loader"></div>`;
          setTimeout(() => {
            const loader = document.querySelector(".typing-loader");
            loader.remove();
            message_container.innerHTML += `<div class="bot" style="background-color: white">
              <img 
                src="https://source.unsplash.com/400x400/?${remove(
                  "#moodsync"
                )} alt="${remove("#moodsync")}" class="unsplash">
            </div>`;
            setTimeout(() => {
              sendSound.play();
              // Get the modal
              var modal = document.getElementById("myModal");

              // Get the image and insert it inside the modal - use its "alt" text as a caption
              var img = document.querySelector(".unsplash");

              var modalImg = document.getElementById("img01");
              var captionText = document.getElementById("caption");
              img.onclick = function () {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
              };

              // Get the <span> element that closes the modal
              var span = document.getElementsByClassName("close")[0];
              // When the user clicks on <span> (x), close the modal
              span.onclick = function () {
                modal.style.display = "none";
              };
              window.scrollTo(0, document.body.scrollHeight);
              location.href = "#edge";
              input_box.focus();
            }, 1500);
          }, 1000);
        })();
      } else if (message.indexOf("@") == 0) {
        setTimeout(() => {
          botReply("Following u now");
        }, 2000);
      } else if (
        message === "How old are you" ||
        message === "what is your age" ||
        message === "what is your age?" ||
        message === "How old are you?"
      ) {
        (function botAge() {
          const dob = new Date(2020, 05, 20);
          const diff_ms = Date.now() - dob.getTime();
          const age_dt = new Date(diff_ms);
          const ageInDays = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
          const ageInYears = Math.abs(age_dt.getUTCFullYear() - 1970);
          ageInDays < 365
            ? botReply(`I am ${ageInDays} days old`)
            : botReply(`I am ${ageInYears} year(s) old`);
        })();
      } else botContentRoute();
    } else botReply("Oops, I'm not good with 'Numbers'!!!"); //logic for numbers
  } else {
    // logic if user sent empty message
    const messages = [
      `Empty messages!, you are so boring. I do have more interesting idea, though`,
      `You can send me your twitter handle. Or give me a name of someone on Twitter you would love me to run analysis on.`,
      `...like Elon Musk, Messi, Trump, Nike, Nigeria. You got the gist.`,
      `Would you like to see pictures based on your mood? In one(1) or few words, state your mood `,
    ];
    let options = [messages[1], messages[3]];
    let random = Math.floor(Math.random() * 2);
    let pickedOne = options[random];
    botReply(messages[0]);
    if (pickedOne == messages[1]) {
      setTimeout(() => botReply(messages[1]), 3500);
      setTimeout(() => botReply(messages[2]), 5000);
    } else if (pickedOne == messages[3])
      setTimeout(() => botReply(messages[3]), 3500);
  }

  async function botContentRoute() {
    message_container.innerHTML += `<div class="self">${message}</div>`;
    location.href = "#edge";
    await bot.reply("local-user", message).then((reply) => botReply(reply));
  }
}

function botReply(message) {
  message_container.innerHTML += `<div class="typing-loader"></div>`;
  setTimeout(() => {
    //Create a loader to give a bot typing feel
    const loader = document.querySelector(".typing-loader");
    loader.remove();
    sendSound.play();
    message_container.innerHTML += `<div class="bot">${message}</div>`;

    window.scrollTo(0, document.body.scrollHeight);
    location.href = "#edge";
    input_box.focus();
  }, 1000);
}

async function botReady() {
  await bot.sortReplies();
  botReply("Hello");
  setTimeout(() => {
    botReply(
      `Chat me up. If you have nothing in mind just click send with no message. I'll take it from there`
    );
  }, 2000);
}

function botNotReady(err) {
  console.log("An error has occurred.", err);
}

//Prevents the keyboard from overlapping the messages on mobile
document.body.addEventListener(
  "focus",
  (event) => {
    const target = event.target;
    switch (target.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "SELECT":
        document.body.classList.add("keyboard");
    }
  },
  true
);
document.body.addEventListener(
  "blur",
  () => document.body.classList.remove("keyboard"),
  true
);
