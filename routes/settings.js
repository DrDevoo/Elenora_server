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
       const setting = await Settings.find({name:param});
       res.json(setting.name);
     }catch(err){
       res.json({ message: err });
     }
});


module.exports = router;