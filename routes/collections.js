const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ProdCollection = require('../models/collections-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/add/:name/:type/:gender", async (req,res) =>{

   try{

       const collection = await ProdCollection.create({  
        col_name: req.params.name,
        col_type: req.params.type,
        col_gender: req.params.gender,
   });
res.json(collection);
    

   }catch(err){
        res.json({ message: err });
        console.log('Kollekcio sikertelen mentése!!!')
   }
   console.log("Kollekcio sikeres mentése!")
})

router.get("/getall", async (req,res) =>{
    try{
        const collections = await ProdCollection.find();
        res.json(collections);
      }catch(err){
        res.json({ message: err });
      }
})


module.exports = router;