const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Products = require('../models/products-model');
const ProductsBoravia = require('../models/prodboravia-model');



//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});


router.post("/addsale/:prodname/:precent/:time", async (req,res) =>{
     try{
     const id = req.params.prodname
     const precent = req.params.precent
     const time = req.params.time

     await Products.updateOne(    
     { prodname: id},
     { $set: {activesale: "true",saleprecent: precent, saletime: time }}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Akcio mentése!")
          res.json({ message: "Sikeres akcio mentés!" });
     }
})

module.exports = router;