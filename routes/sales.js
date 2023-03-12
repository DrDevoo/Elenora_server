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

router.post("/addsalecollection/:collectionname/:precent/:time", async (req,res) =>{
     try{
     const id = req.params.collectionname
     const precent = req.params.precent
     const time = req.params.time

     await Products.updateMany(    
     { collections : id},
     { $set: {activesale: "true",saleprecent: precent, saletime: time }}
     );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Akcio kolekciora mentése!")
          res.json({ message: "Sikeres kollekcio akcio mentés!" });
     }
})



router.get("/getsaled", async (req,res) =>{
     try{
         const products = await Products.find({activesale:"true"});
          const count = await Products.find({activesale:"true"}).count();
         res.json({products,count});
       }catch(err){
         res.json({ message: err });
       }
 })


 router.get("/delete/:id", async (req,res) =>{
     try{
          await Products.updateOne(
               {_id: req.params.id},
               {$set: {activesale: "false",saleprecent: 0, saletime: 0 }}
          )
          res.json({ message: "Sikeres torles!" });
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Akcio sikeres torolve!")
     }
})
module.exports = router;