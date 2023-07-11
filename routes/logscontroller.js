const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Logs = require('../routes/logs');
//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/save/:time/:os/:action", async (req,res) =>{
     const time = req.params.time
     const os = req.params.os
     const action = req.params.action
     await Logs.saveLog(time,os,action)
})

module.exports = router;