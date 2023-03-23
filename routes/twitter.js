import express from "express";
import Twitter from "twitter";
import passport from "passport";
import { nanoid } from "nanoid";
import validUrl from "valid-url";
import { auth } from "../middleware/auth.js";

import Twit from 'twit';
import { client } from "../index.js";
import { twitterclient } from "./twclient.js";
// import {
//   createNewUrl,
//   getUrlByShortUrl,
//   getAllUrl,
//   getUrlBymonth,
// } from "../dbhelper.js";

const router = express.Router();

// const TwitterStrategy = require('passport-twitter').Strategy;
// //shorturl generator api
// router.post("/", async (req, res) => {
//   const client = new Twitter({
//     consumer_key: '',
//     consumer_secret: '',
//     access_token_key: '',
//     access_token_secret: ''
//   });
// });

// // API for dashboard
// router.get("/dashboard", async (req, res) => {
//   try {
//     console.log("This is dshboard API");
//     const date = Date();
//     console.log(date);
//     const month = date.slice(4, 7);
//     console.log(month);
//     const urlOfMonth = await getUrlBymonth(month); console.log(urlOfMonth)
//     res.status(200).send(urlOfMonth);
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// });

//Rest ---- display all users
// To fetch using short url
// router.get("/:code", async (req, res) => {
//   try {
//     console.log("this /:code");
//     const urlcode = req.params.code;
//     console.log(urlcode);
//     const url = await getUrlByShortUrl(urlcode);
//     console.log(url.fullurl);
//     if (url) {
//       return res.redirect(url.fullurl);
//     } else {
//       return res.status(404).json("No URL Found");
//     }
//   } catch (error) {
//     res.status(500).json("Server Error");
//   }
// });

//start1

//end1

// const T = new Twit({
//     consumer_key: process.env.COSUMER_KEY,
//     consumer_secret: process.env.CONSUMER_SECRET,
//     access_token: process.env.ACCESS_TOKEN,
//     access_token_secret: process.env.ACCESS_TOKEN_SECRET,
//   });
// const twitterclient = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//   });

//   clie.get('favorites/list', function(error, tweets, response) {
//     // if(error) throw error;
//     console.log(tweets);  // The favorites.
//     console.log(response);  // Raw response object.
//   });

router.get("/",async (req, res)=>{
    console.log("This is twitter request");
    res.send({message: "this is a twitter request"})
})

// twitterclient.router.get("/fav",async (req, res)=>{
//     console.log("This is twitter fava");
//     // const twitterclient = new Twitter({
//     //     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     //     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     //     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     //     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//     //   });
//       var params = {screen_name: 'nodejs'};
//       twitterclient.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });
//     // clie.get('favorites/list', function(error, tweets, response) {
//     //         // if(error) throw error;
//     //         console.log(tweets);  // The favorites.
//     //         console.log(response); 
//     //         res.send(response) // Raw response object.
//     //       });
// //     const params = {screen_name: 'modi'};
// // const tweets=clie.get('statuses/user_timeline', params, function(error, tweets, response) {
// //   if (!error) {
// //     console.log(tweets);
// //   }
// // });
// // res.send(tweets)
    
// })

// var params = {screen_name: 'nodejs'};
// twitterclient.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });




export const twitterRouter = router;


