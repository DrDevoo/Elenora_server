const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Newsletter = require('../models/newsletter-model');
const Mail = require('../routes/mail');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/subscribe", async (req,res) =>{
   try{
      console.log(req.body)
      const subbed = await Newsletter.create({  
        name: req.body.name1 + " " + req.body.name2,
        email: req.body.email,
      });
      res.json(subbed);
   }catch(err){
        res.json({ message: err });
        console.log('Uj hirlevel felirakozo sikertelen mentése!!!')
   }
   console.log("Uj hirlevel felirakozo sikeres mentése!")
})

router.post("/subscribe/popup/:email", async (req,res) =>{
   try{
      const subbed = await Newsletter.create({  
        name: "",
        email: req.params.email,
      });
      res.json(subbed);
   }catch(err){
        res.json({ message: err });
        console.log('Uj hirlevel felirakozo sikertelen mentése!!!')
   }
   console.log("Uj hirlevel felirakozo sikeres mentése!")
})

router.post("/addmail", async (req,res) =>{
   try{
      console.log(req.body)
      const data = req.body
      Mail.sendPanaszSYS(data.firstname,data.lastname,data.email,data.text)
   }catch(err){
        res.json({ message: err });
        console.log('Uj panasz erkezett!!!')
   }
   console.log("Uj panast hiba!")
})

module.exports = router;