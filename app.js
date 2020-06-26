const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
var Twit = require("twit");
require("dotenv").config();

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//
//
// Email implementation
// Signup Route
app.post("/signup", (req, res) => {
  const { firstName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !email) {
    res.redirect("/html/fail.html");
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          // LNAME: lastName,
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  fetch(
    `https://us10.api.mailchimp.com/3.0/lists/${process.env.AUDIENCE_KEY}`,
    {
      method: "POST",
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
      body: postData,
    }
  )
    .then(
      res.statusCode === 200
        ? res.redirect("/html/success.html")
        : res.redirect("/html/fail.html")
    )
    .catch((err) => console.log(err));
});
//
//
//
// Twitter implementation
(async function () {
  const user = new Twit({
    consumer_key: process.env.API_key_twitter,
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
