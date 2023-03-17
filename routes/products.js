const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Products = require('../models/products-model');
const ProductsBoravia = require('../models/prodboravia-model');

const multer = require('multer');
const upload = multer({ dest: './prod_images/' })
const { uploadFile, getFileStream } = require('./s3');

//Autentikalt index oldal
router.get("/", async (req, res) => {
  
});

router.post("/add/:prodname/:collections/:price/:description/:categ/:colors", async (req,res) =>{
   try{
        const product = await Products.create({  
        prodname: req.params.prodname,
        collections: req.params.collections,
        price: req.params.price,
        description: req.params.description,
        categ: req.params.categ,
        colors: req.params.colors,
        pearls: req.body,
   });
        const savedProduct = await product.save();
        res.json({ message: "Sikeres mentés!" });
        console.log("-------termek-------")
        console.log(savedProduct)
        console.log("--------------")
   }catch(err){
        res.json({ message: err });
        console.log('Termék sikertelen mentése!!!')
   }
   console.log("Termék sikeres mentése!")
})

router.post("/addimg1/:prodname", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodname
    const file = req.file;
    const result = await uploadFile(file);
    console.log("-------kep1-------")
    console.log(id)
    console.log(file)
    console.log(result)
    console.log("--------------")
    await Products.updateOne(    
     { prodname: id},
     { $set: {image: result.Key}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék 1. kép mentése!")
          res.json({ message: "Sikeres 1. mentés!" });
     }
})
router.post("/addimg2/:prodname", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodname
    const file = req.file;
    const result = await uploadFile(file);
    console.log("-------kep2-------")
    console.log(id)
    console.log(file)
    console.log(result)
    console.log("--------------")
    await Products.updateOne(    
     { prodname: id},
     { $set: {image2: result.Key}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék 2. kép mentése!")
          res.json({ message: "Sikeres 2. mentés!" });
     }
})
router.post("/addimg3/:prodname", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodname
    const file = req.file;
    const result = await uploadFile(file);
    console.log("-------kep3-------")
    console.log(id)
    console.log(file)
    console.log(result)
    console.log("--------------")

    await Products.updateOne(    
     { prodname: id},
     { $set: {image3: result.Key}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék 3. kép mentése!")
          res.json({ message: "Sikeres 3. mentés!" });
     }
})


router.post("/update", async (req,res) =>{
     try{
          const updated = await Products.findOneAndUpdate(    
               { _id: req.body._id},
               { $set:
                     {prodname: req.body.prodname,
                    collections: req.body.collections,
                    price: req.body.price,
                    description: req.body.description,
                    categ: req.body.categ,
                    pearls: req.body.pearls,
               }
               }
               );  
          res.json({ message: "Sikeres mentés!" });
          console.log("-------friss-termek-------")
          console.log(updated)
          console.log("--------------")
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Termék sikeres modositva!")
     }
     
  })

router.get("/delete/:id", async (req,res) =>{
     try{
          await Products.findByIdAndRemove(req.params.id)
          res.json({ message: "Sikeres torles!" });
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Termék sikeres torolve!")
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




//BORAVIA KARKOTOK KEZELESE
router.post("/add/boravia/:prodname/:price", async (req,res) =>{
     const product = await ProductsBoravia.create({  
          prodname: req.params.prodname,
          price: req.params.price,
     });
     try{
          res.json({ message: "Sikeres mentés!" });
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
       console.log("Termék sikeres mentése!")   
     }
})
  
  router.post("/addimg/boravia/:prodname", upload.single('file'), async (req,res) =>{
       try{
       const id = req.params.prodname
      const file = req.file;
      const result = await uploadFile(file);
  
      await ProductsBoravia.updateOne(    
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

  router.get("/getall/boravia", async (req,res) =>{
     try{
         const products = await ProductsBoravia.find();
         const count = await ProductsBoravia.find().count();
         res.json({products,count});
       }catch(err){
         res.json({ message: err });
       }
 })
module.exports = router;