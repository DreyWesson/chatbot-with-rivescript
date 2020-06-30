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
// const user = new Twit({
//   consumer_key: process.env.API_key_twitter,
//   consumer_secret: process.env.API_secret_key,
//   access_token: process.env.Access_token,
//   access_token_secret: process.env.Access_token_secret,
// });
// searchForTweets("donald trump");
// async function searchForTweets(query) {
//   try {
//     response = await user.get(
//       `/search/tweets`,
//       {
//         q: query, // The search term
//         lang: "en", // Let's only get English tweets
//         count: 3, // Limit the results to 100 tweets
//       },
//       processTweet
//     );
//     async function processTweet(err, data, res) {
//       const tweets = data.statuses;
//       let allTweets = "";

//       tweets.forEach((tweet) => (allTweets += tweet.text + "\n"));
//       // console.log(allTweets);
//       const sentimentScore = getSentimentScore(allTweets);
//       console.log(
//       `The sentiment about ${query} is: ${sentimentScore}`;
//       );
//       getSentimentScore(allTweets);
//     }
//   } catch (e) {
//     console.log("There was an error calling the Twitter API");
//   }
// }
// const language = require("@google-cloud/language");
// const languageClient = new language.LanguageServiceClient();

// async function getSentimentScore(text) {
//   const document = {
//     content: text,
//     type: "PLAIN_TEXT",
//   };

//   // Detects the sentiment of the text
//   const [result] = await languageClient.analyzeSentiment({
//     document: document,
//   });
//   const sentiment = result.documentSentiment;
//   return console.log(sentiment.score);
// }

const Twitter = require("twitter-lite");
const language = require("@google-cloud/language");
const languageClient = new language.LanguageServiceClient();
const user = new Twitter({
  consumer_key: process.env.API_key_twitter,
  consumer_secret: process.env.API_secret_key,
});
let access_token = process.env.Access_token;
let allTweets = "";

searchForTweets("lionel messi");

async function searchForTweets(query) {
  try {
    let response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    response = await app.get(`/search/tweets`, {
      q: query,
      lang: "en",
      count: 3,
    });

    for (tweet of response.statuses) {
      allTweets += tweet.text + "\n";
    }
    console.log(allTweets);
    const sentimentScore = await getSentimentScore(allTweets);
    console.log(`The sentiment about ${query} is: ${sentimentScore}`);
  } catch (e) {
    console.log("There was an error calling the Twitter API");
    console.dir(e);
  }
}

async function getSentimentScore(text) {
  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  // Detects the sentiment of the text
  const [result] = await languageClient.analyzeSentiment({
    document: document,
  });
  const sentiment = result.documentSentiment;

  return sentiment.score;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
