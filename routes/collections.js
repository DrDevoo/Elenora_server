const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ProdCollection = require('../models/collections-model');
const uploadController = require("./imgcontroller");

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
router.post(
   "/testupload",
   uploadController.uploadImages,
   uploadController.resizeImages,
   uploadController.getResult
 );
router.post("/uploadimg/:id", async (req,res) =>{
   try{
   const id = req.params.id
   const file = req.file;

  console.log("-------kep1-------")
  console.log(file)
  console.log("--------------")
  await Products.findOneAndUpdate(    
   { _id: id},
   { $set: {coverimg: file.filename}}
   );  
   }catch(err){
        console.log(err)
   }finally{
        console.log("Kollekcio kép mentése!")
        res.json({ message: "Kollekcio kep mentés!" });
   }
})

module.exports = router;