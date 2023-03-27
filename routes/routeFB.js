import express from "express";
import Facebook from 'facebook-node-sdk';
import axios from 'axios';
import {getFBUserByUserID,createNewFBuser,UpdateFBPageDetails, getFBPageDetail} from '../dbhelper.js'

const FACEBOOK_APP_ID = '1215861782652613';
const FACEBOOK_APP_SECRET = '93baab5979b0c369088428e9fa25bb0c';



const router = express.Router();

router.get("/",async (req, res)=>{
    console.log("This is FB request");
    res.send({message: "this is a FB request"})
})

router.get('/me', async(req, res) => {
    const FB = new Facebook({
        appId: FACEBOOK_APP_ID,
        secret: FACEBOOK_APP_SECRET,
      });
    try {
      const response = await axios.get(`https://graph.facebook.com/112155545156386?access_token=EAARR0eGmpsUBAK4AC8EM9WwiaWa43AODelxZArZBia829z99vP0ngZCginsa1dOapNADaxTobJ6BwJ6tGT5hB4lVwXpSsIbHDP5d6kGabuBoibo4Af1drkKt7yZBBokXMoxNZCXJEs8TSjD9CVZAvtoeCa5ySPzbm0gZCRZA7jsqI8CT7bP7MMnnhDmGKLM1OFQZD`);
      res.send({ name: response.data.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to get user name' });
    }
  });

  router.post('/addfbuser', async(req, res) => {
    try {
      console.log(req.body.userID)
        const userexist= await getFBUserByUserID(req.body.userID)
        if(userexist){
          res.send({message:"User already registered"})

        }
        else{
          const newFBacc = {
            username: req.body.username,
            useremail:req.body.useremail,
            userID: req.body.userID,
            userAccess_token: req.body.userAccess_token,
            page_ID: "",
            pageAccess_token: "",
          };
          const result= await createNewFBuser(newFBacc);
          res.status(200).send(result)

        }
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to get create user' });
    }


  });

  router.post('/addfbpage', async(req, res) => {
    try {
      console.log(req.body.page_ID)
        const userexist= await getFBUserByUserID(req.body.userID)
        if(!userexist){
          res.send({message:"User doesnt registered"})

        }
        else{
          
          const result= await UpdateFBPageDetails(req.body.userID, req.body.page_ID,req.body.pageAccess_token);
          res.status(200).send(result)

        }
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to add page' });
    }

  });


  router.get('/me', async(req, res) => {
    try {
      const userID  = req.body.userID;
      const userdetails= await getFBPageDetail(userID);
      const userAccess_token= userdetails.userAccess_token;
      const response = await axios.get(`https://graph.facebook.com/${userID}?access_token=${userAccess_token}`);
      res.send({ name: response.data.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to get user name' });
    }
  });

  router.post('/fbpage/feed', async (req, res) => {
    const message  = req.body.message;
    console.log(message);
    console.log(req.body.userID)
    const userID  = req.body.userID;
    const page= await getFBPageDetail(userID);
    console.log(page);
    console.log(page.page_ID,page.pageAccess_token);
    const page_ID=page.page_ID;
    const pageAccess_token=page.pageAccess_token;
    // const pageAccess_token="EAAK4GfdusMYBAKttuGzu6bDEW0nDrxTJmbcSBNqyESKSbZAY3JvZAZB8iGkO7NqmEfjXkqQgWP5WcP9w0wUAGeBBCsLZBRoQQmceJGereuWUvSHrUX6B5aQIY4a1Sn6Tcjc6L8ceCjPMR5L2d7ItpsFRBZA89hMpH2ZB8VsgRElw52EswmZCBo6X6HXCd0hpOtAJ8RecKeHXGH1RiZCaETh8"
   const url=`https://graph.facebook.com/${page_ID}/feed?message=${message}&access_token=${pageAccess_token}`
  // const url= 'https://graph.facebook.com/118758204469681/feed ?message=Hello Fans!&access_token=EAAK4GfdusMYBALoMxJukzX2YXY60xGHlZC8ZA24KwwWP4fZCq42Ss4Grbehyz8HcusGzhQ3oJBWjVNVEC5zDO5q9ugN0ZCPkhDfyPk9eqZBdZCvTHdZC3wJna7B13iZC52SvJqdy0I5p5GHQdgHCyrLR68ZAltR2CDD4mhJNBMRjJABlc54qXYO8ZAlOpKMHscade5z12AOSPXB9qZAoK4iAi7g';
    try {
      // const response = await axios.post(`https://graph.facebook.com/${page_ID}/feed?message=${message}&access_token=${pageAccess_token}`);
     
      const response = await axios.post(url);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to post message to feed' });
    }
  });
  


export const routeFB = router;