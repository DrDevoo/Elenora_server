const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Settings = require('../models/settings-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.get("/get/:name", async (req, res) => {
    try{
        const param = req.params.name
       const setting = await Settings.findOne({name:param});
       res.json(setting);
     }catch(err){
       res.json({ message: err });
     }
});

router.get("/update/status/:value", async (req,res) =>{
  try{
       await Settings.updateOne(
            {name: "sitestatus"},
            {$set: {value: req.params.value}}
       )
       res.json({ message: "Sikeres mentes!" });
  }catch(err){
       res.json({ message: err });
       console.log(err)
  }finally{
       console.log("status sikeres mentese!")
  }
})
router.get("/update/headertitle/:value", async (req,res) =>{
  try{
       await Settings.updateOne(
            {name: "header_title"},
            {$set: {value: req.params.value}}
       )
       res.json({ message: "Sikeres mentes!" });
  }catch(err){
       res.json({ message: err });
       console.log(err)
  }finally{
       console.log("szoveg sikeres mentese!")
  }
})


module.exports = router;