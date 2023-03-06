const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
   host: 'smtp.rackhost.hu',
    port: 465,
    auth: {
        user: "info@elenora.hu",
        pass: "TREleNora23"
    }
})

//Autentikalt index oldal
router.get("/", async (req, res) => {
    message = {
        from: "info@elenora.hu",
        to: "krichard001@icloud.com",
        subject: "Subject",
        text: "Hello SMTP Email"
    }
     
    transporter.sendMail(message)
});

router.get("/delete/:id", async (req,res) =>{
     try{
          await Products.updateOne(
               {_id: req.params.id},
               {$set: {activesale: "false",saleprecent: 0, saletime: 0 }}
          )
          res.json({ message: "Sikeres torles!" });
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Akcio sikeres torolve!")
     }
})


module.exports = router;