const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Products = require('../models/products-model');

const multer = require('multer');
const upload = multer({ dest: './prod_images/' })
const { uploadFile, getFileStream } = require('./s3')

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/add/:prodname/:collections/:price/:description/:categ/:colors", async (req,res) =>{
   const product = await Products.create({  
        prodname: req.params.prodname,
        collections: req.params.collections,
        price: req.params.price,
        description: req.params.description,
        categ: req.params.categ,
        colors: req.params.colors,
        pearls: req.body,
   });
   try{
        const savedProduct = await product.save();
        res.json({ message: "Sikeres mentés!" });
   }catch(err){
        res.json({ message: err });
        console.log('Termék sikertelen mentése!!!')
   }
   console.log("Termék sikeres mentése!")
})

router.post("/addimg/:prodname", upload.single('file'), async (req,res) =>{
     try{
         const id = req.params.prodname
    const file = req.file;
    const result = await uploadFile(file);

    await Products.updateOne(    
     { prodname: id},
     { $set: {image: result.Key}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék kép mentése!")
          res.json({ message: "Sikeres mentés!" });
     }
})


router.post("/update/:id/:prodname/:collections/:price/:description/:categ", async (req,res) =>{
     try{
          await Products.findOneAndUpdate(    
               { _id: req.params.id},
               { $set:
                     {prodname: req.params.prodname,
                    collections: req.params.collections,
                    price: req.params.price,
                    description: req.params.description,
                    categ: req.params.categ
               }
               }
               );  
          res.json({ message: "Sikeres mentés!" });
     }catch(err){
          res.json({ message: err });
          console.log('Termék sikertelen modositva!!!')
     }finally{
          console.log("Termék sikeres modositva!")
     }
     
  })


router.get("/getall", async (req,res) =>{
    try{
        const products = await Products.find();
        const count = await Products.find().count();
        res.json({products,count});
      }catch(err){
        res.json({ message: err });
      }
})

router.get("/getbycateg/:categ", async (req,res) =>{
     try{
          const categ = req.params.categ
         const products = await Products.find({categ:categ});
          const count = await Products.find({categ:categ}).count();
         res.json({products,count});
       }catch(err){
         res.json({ message: err });
       }
 })

router.get("/getbyid/:id", async (req,res)=>{
     try{
          const id = req.params.id
          const product = await Products.findById(id);
          res.json(product);
     }catch(err){
          res.json({ message: err });
     }
})


module.exports = router;