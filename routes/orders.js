const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});


router.post("/start", async (req,res) =>{
     try{
     const cart = req.body
     console.log(cart)

     var dateObj = new Date();
     var month = dateObj.getUTCMonth() + 1; //months from 1-12
     var day = dateObj.getUTCDate();
     var year = dateObj.getUTCFullYear();
     const orderid = year + "/" + month + "/" + day;
     console.log(orderid)
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés megkezdve!")
          res.json({ azonosito: "teszt1233" });
     }
})

module.exports = router;