const express = require('express');
require("dotenv").config();

const Logs = require('../models/logs-model');

//Pénztár megnyitása
async function saveLog(time,os,action){
     console.log("Log mentése...")
     try{
       const saved = await Logs.create({  
        action: action,
        date: time,
        os: os,
     });
     console.log(saved)
   }catch(err){
        res.json({ message: err });
        console.log('Log sikertelen rögzitése!!!')
   }
   console.log("Log sikeres rögzitése!")
}


module.exports = { saveLog }