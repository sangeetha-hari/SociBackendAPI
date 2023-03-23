import express from "express";
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import { userRouter } from "./routes/usersaccount.js";
import {routeFB} from "./routes/routeFB.js"
import { twitterRouter } from "./routes/twitter.js";
import { getAlluser } from "./dbhelper.js";
import { twitterclient } from "./routes/twclient.js";
import cors from 'cors';
import FB from 'fb'; 







dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;
export const app=express();
app.use(express.json());
app.use(cors());

async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    console.log("Mongo is connected");
    await client.connect();
    return client;
}

 export const client=await createConnection();
 
 FB.setAccessToken(process.env.ACCESS_TOKEN);
 

app.get("/",(req,res)=>{
    try {
        res.status(200).send("Welcome to app");
    } catch (error) {
        res.status(400).send({"message":error});
    }
   
})




app.get("/allusers",async(req,res)=>{
    try {
        const users= await getAlluser();
  res.send(users);
    } catch (error) {
        res.status(400).send({"message":error});
    }
   
})


// app.get('/tweets.json', function (req, res) {
//     console.log(req.query.username);
//     var params = {screen_name: req.query.username};
//     twitterclient.get('statuses/user_timeline', params, function (error, tweets, response) {
//      console.log(error);
//      if (!error) {
//       res.json(tweets);
//      } else {
//       res.json({error: error});
//      }
//     });
//    });


// FB.api('4', function (res) {
//     if(!res || res.error) {
//      console.log(!res ? 'error occurred' : res.error);
//      return;
//     }
//     console.log(res.id);
//     console.log(res.name);
//   });


app.use('/users',userRouter);
app.use('/fb',routeFB)
// app.use('/twitter',twitterRouter);



app.listen(PORT,()=>console.log("Server started on port",PORT));


