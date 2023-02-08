const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Cupons = require('../models/cupons-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/login", (req, res) => {
    const USERNAME = "admin";
    const PASSWORD = "admin";
    const { username, password } = req.body;
    if (username === process.env.ADMIN1_USERNAME && password === process.env.ADMIN1_PASSWORD) {
      const user = {
        id: 1,
        name: process.env.ADMIN1_FULLNAME,
        username: process.env.ADMIN1_USERNAME,
      };
      const token = jwt.sign(user, process.env.JWT_KEY);
      res.json({
        token,
        user,
      });
      console.log("Bejeletkezve")
    } else {
      if (username === process.env.ADMIN2_USERNAME && password === process.env.ADMIN2_PASSWORD) {
        const user = {
          id: 1,
          name: process.env.ADMIN2_FULLNAME,
          username: process.env.ADMIN2_USERNAME,
        };
        const token = jwt.sign(user, process.env.JWT_KEY);
        res.json({
          token,
          user,
        });
        console.log("Bejeletkezve")
      } else {
        res.status(403);
        res.json({
          message: "Hibás bejeltkezés",
        });
        console.log("!Bejeletkezés elutasítva!")
      }
    }
});

module.exports = router;