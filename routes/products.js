const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Products = require('../models/products-model');
const Inventory = require('../models/inventory-model');
const ProductsBoravia = require('../models/prodboravia-model');
const ProductsStone = require('../models/prodstone-model');

const multer = require('multer');
const upload = multer ({
     dest: "../../../var/www/Elenora_client/dist/prodimgs",
     limits: {
     fileSize: 5000000
     }
});
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
        res.json(savedProduct);
        console.log("-------termek-------")
        console.log(savedProduct)
        console.log("--------------")
   }catch(err){
        res.json({ message: err });
        console.log('Termék sikertelen mentése!!!')
   }
   console.log("Termék sikeres mentése!")
})
router.post("/addimg1/:prodid", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodid
     const file = req.file;

    console.log("-------kep1-------")
    console.log(file)
    console.log("--------------")
    await Products.findOneAndUpdate(    
     { _id: id},
     { $set: {image: file.filename}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék 1. kép mentése!")
          res.json({ message: "Sikeres 1. mentés!" });
     }
})
router.post("/addimg2/:prodid", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodid
     const file = req.file;

    console.log("-------kep2-------")
    console.log(file)
    console.log("--------------")
    await Products.findOneAndUpdate(    
     { _id: id},
     { $set: {image2: file.filename}}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Termék 2. kép mentése!")
          res.json({ message: "Sikeres 2. mentés!" });
     }
})
router.post("/addimg3/:prodid", upload.single('file'), async (req,res) =>{
     try{
     const id = req.params.prodid
     const file = req.file;

    console.log("-------kep3-------")
    console.log(file)
    console.log("--------------")

    await Products.findOneAndUpdate(    
     { _id: id},
     { $set: {image3: file.filename}}
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
router.get("/getajanlott", async (req,res) =>{
     try{
         const products = await Products.find({ajanlott:"true"});
         res.json(products);
       }catch(err){
         res.json({ message: err });
       }
})
router.get("/getsaled", async (req,res) =>{
     try{
          let responseitems = []
         const products = await Products.find({activesale:"true"});
         for(let x = 0;x<4;x++){
          responseitems.push(products[x])
     }
         res.json(responseitems);
       }catch(err){
         res.json({ message: err });
       }
})
router.get("/getnews", async (req,res) =>{
     try{
          let responseitems = []
         const products = await Products.find({categ:"aproko"});
          for(let x = 0;x<4;x++){
               responseitems.push(products[x])
          }
         res.json(responseitems);
       }catch(err){
         res.json({ message: err });
       }
})
router.get("/getbycollection/:collection", async (req,res) =>{
     try{
          const collection = req.params.collection
         const products = await Products.find({collections:collection});
         res.json(products);
       }catch(err){
         res.json({ message: err });
       }
 })

router.get("/getbyid/:id", async (req,res)=>{
     try{
          const id = req.params.id
          const product = await Products.findById(id);
          var xs = true
          var s = true
          var m = true
          var l = true
          var xl = true
          var xxl = true
          var box = true
          for(item in product.pearls){
               const x = await Inventory.findOne({ item_name: product.pearls[item].name })   
               const idb = x.item_quantity  
               if(product.pearls[item].xs > idb){
                    xs = false
               }
               if(product.pearls[item].s > idb){
                    s = false
               }
               if(product.pearls[item].m > idb){
                    m = false
               }
               if(product.pearls[item].l > idb){
                    l = false
               }
               if(product.pearls[item].xl > idb){
                    xl = false
               }
               if(product.pearls[item].xxl > idb){
                    xxl = false
               }
          }
          const feketedoboz = await Inventory.findOne({ item_name: 'Fekete doboz' })   
          const feketedb = feketedoboz.item_quantity  
          const feherdoboz = await Inventory.findOne({ item_name: 'Fehér doboz' })   
          const feherdb = feherdoboz.item_quantity 
          if(feketedb < 1 && feherdb < 1){
               box = false
          }
          res.json({product,xs,s,m,l,xl,xxl,box});
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


//Kavics termékek kezelése
router.post("/add/stone/:prodname/:price", async (req,res) =>{
     const product = await ProductsStone.create({  
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
router.post("/addimg/stone/:prodname", upload.single('file'), async (req,res) =>{
       try{
       const id = req.params.prodname
      const file = req.file;
      const result = await uploadFile(file);
  
      await ProductsStone.updateOne(    
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
router.get("/getall/stone", async (req,res) =>{
     try{
         const products = await ProductsStone.find();
         res.json(products);
       }catch(err){
         res.json({ message: err });
       }
})

router.get("/changeallprice/:count", async (req,res) =>{
     try {
          const count = req.params.count
          const products = await Products.find();

          products.forEach(async (prod) => {
               console.log(prod.prodname)
          });
      }catch(err){
        res.json({ message: err });
      }
})

module.exports = router;