const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Orders = require('../models/orders-model');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});


router.post("/start", async (req,res) =>{
     try{
     const cart = req.body

     var dateObj = new Date();
     var month = dateObj.getUTCMonth() + 1; //months from 1-12
     var day = dateObj.getUTCDate();
     var year = dateObj.getUTCFullYear();
     const count = await Orders.find().count();
     const ordersnumber = count + 1
     const orderid = year +""+ month+ "" + day + "-" + ordersnumber;

     const order = await Orders.create({  
          orderid: orderid,
          cart: req.body,
     });
     var startedOrder = await order.save();
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés megkezdve!")
          console.log(startedOrder)
          res.json(startedOrder);
     }
})

router.post("/saveuser/:id", async (req,res) =>{
     try{
     const user = req.body
     const id = req.params.id

          console.log(user)
          console.log("")
          console.log(id)
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés adatok megadva!")
     }
})

module.exports = router;