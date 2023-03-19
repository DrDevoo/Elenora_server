const express = require('express');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const fs = require('fs');
const path = require('path')
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const Orders = require('../models/orders-model');

let transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
// point to the template folder
const handlebarOptions = {
     viewEngine: {
         partialsDir: path.resolve('./routes/mails/'),
         defaultLayout: false,
     },
     viewPath: path.resolve('./routes/mails/'),
};
// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))




//Rendeles leadva FELHASZBALOI email
async function sendOrderMail(id){
     console.log("Fut az email kuldes...")
     const order = await Orders.findById(id);

     message = {
          from: "informacio@elenora.hu",
          to: order.u_email,
          subject: "A megrendelést megkaptuk",
          template: 'megrendelve', // the name of the template file i.e email.handlebars
          context:{
              orderid : order.orderid,
              firstname: order.u_firstname,
              lastname: order.u_name,
          }
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}
//Rendeles szallita alatt FELHASZBALOI email
async function sendShippingMail(id){
     console.log("Fut az email kuldes...")
     const order = await Orders.findById(id);

     message = {
          from: "informacio@elenora.hu",
          to: order.u_email,
          subject: "Rendelésed úton van hozzád",
          template: 'szallitas', // the name of the template file i.e email.handlebars
          context:{
              orderid : order.orderid,
              firstname: order.u_firstname,
              lastname: order.u_name,
          }
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}
//Rendeles szamla FELHASZBALOI email
async function sendSzamlaMail(id){
     console.log("Fut az email kuldes...")
     const order = await Orders.findById(id);

     message = {
          from: "informacio@elenora.hu",
          to: order.u_email,
          subject: "A rendelésedhez tartozó számla",
          template: 'szamla', // the name of the template file i.e email.handlebars
          context:{
              orderid : order.orderid,
              firstname: order.u_firstname,
              lastname: order.u_name,
          }
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}


async function sendOrderSYS(id){
     message = {
          from: "info@elenora.hu",
          to: ["krichard@elenora.hu"],
          subject: "Új rendelés!",
          html: await readFile(path.join(__dirname, 'mails/test.html'), 'utf8')
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}
async function sendOpened(){
     message = {
          from: "info@elenora.hu",
          to: ["krichard@elenora.hu","hkrisztina05@gmail.com"],
          subject: "Új rendelés!",
          html: await readFile(path.join(__dirname, 'mails/opened.html'), 'utf8')
     }
       
     transporter.sendMail(message)
  
     return "Email sikeresen kiküldve!"
}




async function TsendShippingMail(id){
     console.log("Fut az email kuldes... (TESZT)")

     message = {
          from: "informacio@elenora.hu",
          to: "krichard001@icloud.com",
          subject: "Rendelésed úton van hozzád",
          template: 'szallitas', // the name of the template file i.e email.handlebars
          context:{

          }
     }
       
     transporter.sendMail(message)
  
     return "TESZT Email sikeresen kiküldve!"
}
module.exports = { sendOrderMail,sendOpened,sendShippingMail,sendSzamlaMail,TsendShippingMail }