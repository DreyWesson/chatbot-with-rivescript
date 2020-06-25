var Twit = require("twit");
require("dotenv").config();
// console.log(process.env.API_key);
(async function () {
  const user = new Twit({
    consumer_key: process.env.API_key,
    consumer_secret: process.env.API_secret_key,
    access_token: process.env.Access_token,
    access_token_secret: process.env.Access_token_secret,
  });

  try {
    response = user.get(
      `/search/tweets`,
      {
        q: "Lionel Messi", // The search term
        lang: "en", // Let's only get English tweets
        count: 3, // Limit the results to 100 tweets
      },
      processTweet
    );
    function processTweet(err, data, res) {
      const tweets = data.statuses;
      tweets.forEach((tweet, i) => console.log(tweets[i].text));
    }
  } catch (e) {
    console.log("There was an error calling the Twitter API");
    console.dir(e);
  }
})();
