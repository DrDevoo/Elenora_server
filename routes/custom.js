const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomProd = require('../models/custom-model');


//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});


router.post("/add", async (req,res) =>{
     try{
          const prod = req.body
          const product = await CustomProd.create({  
               pearl: prod.pearl,
               tcolor: prod.tcolor,
               text: prod.text,
               size: prod.size,
               pearls: prod.pearls,
          });
          let savedProduct = await product.save();
          res.json(savedProduct);
     }catch(err){
          console.log(err)
     }finally{
          console.log("egyedi karkoto mentése!")
     }
})
module.exports = router;