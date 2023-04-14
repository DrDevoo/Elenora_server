const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ProdCollection = require('../models/collections-model');
const multer = require('multer');
const SharpMulter  =  require("sharp-multer");
const storage =  
 SharpMulter ({
              destination:(req, file, callback) =>callback(null, "../../../var/www/Elenora_client/dist/coverimgs"),
              imageOptions:{
               fileFormat: "jpg",
               quality: 80,
               resize: { width: 500, height: 500 },
                 }
           });
const upload  =  multer({ storage });

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
router.post("/uploadimg/:id", upload.single('file'), async (req,res) =>{
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