const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Orders = require('../models/orders-model');
const Mail = require('../routes/mail');
const Products = require('../models/products-model');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

//Autentikalt index oldal
router.get("/", async (req, res) => {
     const products = await Products.find();
     console.log(products)
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
     var updated = await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                    u_email: user.u_email,
                    u_firstname: user.u_first,
                    u_name: user.u_name,
                    u_legio: user.u_regio,
                    u_postnumber: user.u_postnumber,
                    u_city: user.u_city,
                    u_addresse: user.u_addresse,
                    u_tel: user.u_tel,
               }
               }
               );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés adatok megadva!")
          res.json(updated)
     }
})

router.post("/saveshipping/:id", async (req,res) =>{
     try{
     const shipping = req.body
     const id = req.params.id
     var updated = await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                    shipping: shipping.shipping,
               }
               }
               );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés adatok megadva!")
          res.json(updated)
     }
})

router.post("/finish/:id", async (req,res) =>{
     try{
          const id = req.params.id   
          var updated = await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                         status: "ordered",
                    }
               }
          );  

          var mailer = Mail.sendOrderMail(id) 
          console.log(mailer)
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés leadva!")
          res.json(updated)
     }
})

router.post("/pay", async (req, res) => {
  try {
     console.log("Fiezetés megkezdve!")

     const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
          return {
            price_data: {
              currency: "huf",
              product_data: {
                name: item.id,
              },
              unit_amount: 500 * 100,
            },
            quantity: 1,
          }
        }),
      success_url: `${process.env.CLIENT_URL}/shop/thanks/?id=${req.body.orderid}`,
      cancel_url: `${process.env.CLIENT_URL}/shop`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.json(e)
  }
})


router.get("/getall", async (req,res) =>{
     try{
         const orders = await Orders.find();
         const r_orders = orders.reverse()
         const count = await Orders.find().count();
         res.json({r_orders,count});
       }catch(err){
         res.json({ message: err });
       }
})
router.get("/getbyid/:id", async (req,res)=>{
     try{
          const id = req.params.id
          const product = await Orders.findById(id);
          res.json(product);
     }catch(err){
          res.json({ message: err });
     }
})

module.exports = router;