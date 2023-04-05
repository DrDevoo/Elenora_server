const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require("cors");
const fileUpload = require('express-fileupload');
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
const auth = require("./middleware/auth");
const cron = require("node-cron");
const Mail = require('./routes/mail');

//Kapcsolt komponensek
const productsRoute = require('./routes/products');
const getimage = require('./routes/getimage')
const collectionsRoute = require('./routes/collections')
const cuponsRoute = require('./routes/cupons')
const inventoryRoute = require('./routes/inventory')
const adminRoute = require('./routes/admin')
const settingsRoute = require('./routes/settings')
const salesRoute = require('./routes/sales')
const ordersRoute = require('./routes/orders')
const newsletterRoute = require('./routes/newsletter')

//Kulso komponensel hasznalata
app.use('/products', productsRoute)
app.use('/getimage', getimage)
app.use('/collections', collectionsRoute)
app.use('/cupons', cuponsRoute)
app.use('/inventory', inventoryRoute)
app.use('/admin', adminRoute)
app.use('/settings', settingsRoute)
app.use('/sales', salesRoute)
app.use('/orders', ordersRoute)
app.use('/newsletter', newsletterRoute)

//Adatbazis kapcsolat
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.DB_CONNECTION, 
    () => {console.log('--Adatbazis kapcsolat: '+mongoose.connection.readyState+'--')
});

//Autentikalt index oldal
app.get("/", auth, (req, res) => {
  res.status(200).send("ELENORA API 1.0.0 🙌 ");
});

app.post("/testupload",upload.single('file'), (req, res) => {
  
  if (!req.file) {
    return res.status(500).send({ msg: "file is not found" })
}
    // accessing the file
const myFile = req.file;

//  mv() method places the file inside public directory
myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({name: myFile.name, path: `/${myFile.name}`});
});
});

// 404 Not found oldal
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Az oldal nem található",
    error: {
      statusCode: 404,
      message: "Ez az utvonal nem vezet sehova",
    },
  });
});

//Automatikus nyitás időzités
cron.schedule('00 17 31 3 *', async function() {
  console.log('!!!AZ ELENORA OLDAL MEGNYILT!!!');
  try{
    await Settings.updateOne(
         {name: "sitestatus"},
         {$set: {value: "online"}}
    )
}catch(err){
    res.json({ message: err });
    console.log(err)
}finally{
  Mail.sendOpened() 
  console.log(mailer)
}
});

//Szerver certificates
const httpServer = http.createServer(app);
//Az app nyitott portjai
httpServer.listen(3900, () => {
  console.log('---HTTP szerver elerheto a 3900 porton---');
});

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/elenora.hu/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/elenora.hu/fullchain.pem'),
}, app);
httpsServer.listen(444, () => {
  console.log('---HTTPS szerver elerheto a 444 porton---');
});
