const express = require('express');
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

async function sendOrderMail(id){
     message = {
          from: "info@elenora.hu",
          to: "krichard001@icloud.com",
          subject: "Új rendelés!",
          html: await readFile(path.join(__dirname, 'mails/test.html'), 'utf8')
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}

module.exports = { sendOrderMail }