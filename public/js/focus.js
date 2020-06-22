function selfReply(message) {
  if (message) {
    if (isNaN(message)) {
      // filter Message to remove first message
      // used to indicate whether unsplash, twitter or follow
      function filterMessage() {
        var res = message.split(" ");
        var processing = res.splice(1);
        const refined = processing.join(" ");
        return refined;
      }
      // logic for twitter
      if (message.indexOf("#wessonbot") == 0) {
        setTimeout(() => {
          filterMessage();
          botReply("This is peoples opinion");
        }, 2000);
      } else if (message.indexOf("@") == 0) {
        if (message.indexOf("@unsplash") == 0) {
          // logic for unsplash pictures
          console.log(filterMessage());
        } else {
          // logic for twitter follow
          setTimeout(() => {
            botReply("Following u now");
          }, 2000);
        }
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
  function unsplashRoute() {
    let botDiv = `<div class="self">${message}</div>`;
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://source.unsplash.com/400x400/?${filterMessage()}`
    );
    botDiv.appendChild(img);
    img.setAttribute("title", `${value}`);
    // botReply(`This are your pictures ${filterMessage()}`);
    message_container.innerHTML += botDiv;
    location.href = "#edge";
  }
}
