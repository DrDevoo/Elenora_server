const express = require('express');
require("dotenv").config();

const Logs = require('../models/logs-model');


async function saveLog(time,os,action){
     console.log("Log rögzitése...")
     try{
       const saved = await Logs.create({  
        action: action,
        date: time,
        os: os,
     });
     console.log(saved)
   }catch(err){
        console.log('Log sikertelen rögzitése!!!')
   }
   console.log("Log sikeres rögzitése!")
}

async function get(action){
     console.log("Log lekérése...")
     try{
          var query = Logs.find({action:action})
          console.log(query)

          return query.count()
   }catch(err){
        console.log('Log sikertelen lekérése!!!')
   }
   console.log("Log sikeres lekérése!")
}


module.exports = { saveLog,get }