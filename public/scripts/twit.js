var Twit = require("twit");

(async function () {
  const user = new Twit({
    consumer_key: "...",
    consumer_secret: "...",
  });

  try {
    response = user.get(
      `/search/tweets`,
      {
        q: "Lionel Messi", // The search term
        lang: "en", // Let's only get English tweets
        count: 3, // Limit the results to 100 tweets
      },
      function (err, data, res) {
        const tweets = data.statuses;
        tweets.forEach((tweet, i) => console.log(tweets[i].text));
      }
    );
  } catch (e) {
    console.log("There was an error calling the Twitter API");
    console.dir(e);
  }
})();
