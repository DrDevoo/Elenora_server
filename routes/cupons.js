const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Cupons = require('../models/cupons-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/add/:name/:value", async (req,res) =>{

   try{

       const cupon = await Cupons.create({  
        cupon_name: req.params.name,
        cupon_value: req.params.value,
   });
res.json(cupon);
    

   }catch(err){
        res.json({ message: err });
        console.log('Kupon sikertelen mentése!!!')
   }
   console.log("Kupon sikeres mentése!")
})

router.get("/getall", async (req,res) =>{
    try{
        const cupons = await ProdCollection.find();
        res.json(cupons);
      }catch(err){
        res.json({ message: err });
      }
})


module.exports = router;