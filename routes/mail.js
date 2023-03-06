const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path')
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

let transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

//Autentikalt index oldal
router.get("/", async (req, res) => {
    message = {
        from: "info@elenora.hu",
        to: "krichard001@icloud.com",
        subject: "Új rendelés!",
        html: await readFile(path.join(__dirname, 'mails/test.html'), 'utf8')
    }
     
    transporter.sendMail(message)

    console.log("Email sended")
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