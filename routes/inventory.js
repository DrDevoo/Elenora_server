const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Inventory = require('../models/inventory-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/add/:name/:quantity", async (req,res) =>{

   try{

       const item = await Inventory.create({  
        item_name: req.params.name,
        item_quantity: req.params.quantity,
   });
res.json(item);
    

   }catch(err){
        res.json({ message: err });
        console.log('Alapanyag sikertelen mentése!!!')
   }
   console.log("Alapanyag sikeres mentése!")
})

router.get("/getall", async (req,res) =>{
    try{
        const items = await Inventory.find();
        res.json(items);
      }catch(err){
        res.json({ message: err });
      }
})


module.exports = router;