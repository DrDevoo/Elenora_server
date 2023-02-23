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
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés megkezdve!")
          res.json({ azonosito: "teszt1233" });
     }
})

module.exports = router;