const express = require('express');
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const fs = require('fs');

const Orders = require('../models/orders-model');
const Invoices = require('../models/invoices-model');
const Mail = require('../routes/mail');
const Ftp = require('../routes/ftp');
const Products = require('../models/products-model');
const Inventory = require('../models/inventory-model');
const Cupons = require('../models/cupons-model');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

//Autentikalt index oldal
router.get("/", async (req, res) => {
     const products = await Products.find();
     console.log(products)
});

//Rendelés kosarának frissítése
router.post("/updatecart/:id", async (req,res) =>{
     try{
     const cart = req.body
     const id = req.params.id

     var updated = await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                    cart: cart
                    }
               }
               );  
     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés kosar frissitve!")
          res.json(updated)
     }
})
//NewPayment rendelés felvétele
router.post("/neworder/:fname/:lname/:email/:city/:postcode/:addresse/:payment", async (req, res) => {
     try{
          const body = req.body

          var dateObj = new Date();
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();
          const count = await Orders.find().count();
          const ordersnumber = count + 1
          const orderid = year +""+ month+ "" + day + "-" + ordersnumber;
     
          const order = await Orders.create({  
               orderid: orderid,
               u_email: req.params.email,
               u_firstname: req.params.fname,
               u_name: req.params.lname,
               u_legio: "Magyarország",
               u_postnumber: req.params.postcode,
               u_city: req.params.city,
               u_addresse: req.params.addresse,
               u_tel: "null",
               shipping: req.params.payment,
               szamlazasimod: "same",
               szamlazasOrszag: "Magyarország",
               szamlazasVezeteknev: req.params.fname,
               szamlazasUtonev: req.params.lname,
               szamlazasIranyitoszam: req.params.postcode,
               szamlazasTelepules: req.params.city,
               szamlazasCim: req.params.addresse,
               szamlazasTel: "null",
               cart: body,
          });
          var Order = await order.save();
          

     }catch(err){
          console.log(err)
     }finally{
          console.log("Rendelés felvéve!")
          res.json(Order)
     }
})

//Rendelés ONLINE fizetése
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
                name: item.name,
              },
              unit_amount: Math.round(item.price - (item.price / 100) * item.sale) * 100,
            },
            quantity: item.quantity,
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


//Frissitesek(Autenticated)
router.get("/update/ordered/:id", async (req,res) =>{
console.log("rendeles ellenorzese...")
     const id = req.params.id   

     const statusdb = await Orders.findById(id);
     const statusdata = statusdb.status
     if(statusdata == "ordered"){
          console.log("Rendelés már véglegesítve lett!")
     }else{
               console.log("Rendelés véglegesítése")
 try{
          const id = req.params.id   

          await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                         status: "ordered",
                    }
               }
          );  

          var order = await Orders.findById(id);
          for(items in order.cart){
               var size = order.cart[items].size
               const product = await Products.findOne({prodname : order.cart[items].name});
               if(product.pearls){
                    for(x in product.pearls){
                         if(size == "XS"){
                              console.log(product.pearls[x].name + " minuss(XS): " + product.pearls[x].xs)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].xs
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }
                         if(size == "S"){
                              console.log(product.pearls[x].name + " minuss(XS): " + product.pearls[x].s)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].s
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }
                         if(size == "M"){
                              console.log(product.pearls[x].name + " minuss(M): " + product.pearls[x].m)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].m
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }    
                         if(size == "L"){
                              console.log(product.pearls[x].name + " minuss(XS): " + product.pearls[x].l)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].l
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }
                         if(size == "XL"){
                              console.log(product.pearls[x].name + " minuss(XS): " + product.pearls[x].xl)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].xl
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }
                         if(size == "XXL"){
                              console.log(product.pearls[x].name + " minuss(XS): " + product.pearls[x].xxl)
                              const inv = await Inventory.findOne({item_name: product.pearls[x].name})
                              const newdb = inv.item_quantity - product.pearls[x].xxl
                              await Inventory.updateOne({ item_name: product.pearls[x].name }, { item_quantity: newdb })
                         }
                    } 
               }
          }

          }catch(err){
          console.log(err)
          }finally{
          console.log("Rendelés leadva!")
          }

          try{
          //Szamla kiallitasa
          const id = req.params.id   
          console.log("Számla lekérése...")
          let list = []
          for(x in order.cart){
               if(order.cart[x].price > 0){
               list.push({
               label: order.cart[x].name,
               quantity: order.cart[x].quantity,
               unit: "db",
               vat: "AAM",
               grossUnitPrice: Math.round(order.cart[x].price - (order.cart[x].price / 100) * order.cart[x].sale),
               });
               }
          }
          let resszamla = await fetch(process.env.SZAMLAZO_API_URL,{
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({order,list}),
          });
          const json = await resszamla.json();
          var buffer = Buffer.from(json.pdf, 'base64')
          fs.writeFileSync('./szamlak/'+json.invoiceId + ".pdf", buffer)

          await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {
                         szamlaid: json.invoiceId,
                    }
               }
          ); 

          const invoice = await Invoices.create({  
               orderid: id,
               invoiceid: json.invoiceId
          });
               
          await Mail.sendOrderMail(id) 
          await Mail.sendOrderSYS()

          }catch(err){
          console.log(err)
          }finally{
          console.log("Rendelés szamla kiallitva és emailek elkuldve!")
          }
     }

    
})
//send szamla
router.get("/sendszamla/:id/:invoiceid", async (req, res) => {
     try {
          const id = req.params.id
          const invoiceid = req.params.invoiceid
          await Mail.sendSzamlaMail(id,invoiceid)
     }catch(err){
          console.log(err)
          }
})
router.get("/getszamlak", async (req, res) => {
     try{
        const invoices = await Invoices.find();
        res.json(invoices);
      }catch(err){
        res.json({ message: err });
      }
})

//Rendelés törlése
router.get("/update/del/:id", async (req,res) =>{
     try{
          const id = req.params.id
          await Orders.findByIdAndRemove(id)
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Rendelés sikeres törölve!")
     }
})
//Rendelés összekészítve
router.get("/update/maked/:id", async (req,res) =>{
     try{
          const id = req.params.id
          await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {status : "maked"}
               }
          );  
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Rendelés összekészítve!")
     }
})
//Rendelés szállítás alatt
router.get("/update/shipping/:id", async (req,res) =>{
     try{
          const id = req.params.id 
          await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {status : "shipping"}
               }
          );  
          Mail.sendShippingMail(id)
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Rendelés szállítás alatt!")
     }
})
//Rendelés kész
router.get("/update/finish/:id", async (req,res) =>{
     try{
          const id = req.params.id
          await Orders.findOneAndUpdate(    
               { _id: id},
               { $set:
                    {status : "done"}
               }
          );  
     }catch(err){
          res.json({ message: err });
          console.log(err)
     }finally{
          console.log("Rendelés sikeresen teljesítve!")
     }
})


//Lekérések (Autenticated)
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


//teszteles
router.get("/testszamla", async (req,res) =>{
     console.log("Számla lekérése...")
     const id = "642006e5ed35b6e26d38c9e3"
     const order = await Orders.findById(id);
     let list = []
     for(x in order.cart){
          if(order.cart[x].price > 0){
                        list.push({
               label: order.cart[x].name,
               quantity: order.cart[x].quantity,
               unit: "db",
               vat: "AAM",
               grossUnitPrice: order.cart[x].price,
             }); 
          }

     }
     console.log(list)
     let resszamla = await fetch(process.env.SZAMLAZO_API_URL,{
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({order,list}),
     });
     const json = await resszamla.json();
     var buffer = Buffer.from(json.pdf, 'base64')
     fs.writeFileSync('./szamlak/'+json.invoiceId + ".pdf", buffer)
})

module.exports = router;