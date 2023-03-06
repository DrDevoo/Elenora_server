const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require("cors");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
const auth = require("./middleware/auth");
const cron = require("node-cron");
app.use('/prod_images', express.static('public'))

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
const mailRoute = require('./routes/mail')
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
app.use('/mailer', mailRoute)

//Adatbazis kapcsolat
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.DB_CONNECTION, 
    () => {console.log('--Adatbazis kapcsolat: '+mongoose.connection.readyState+'--')
});

//Autentikalt index oldal
app.get("/", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/elenora.hu/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/elenora.hu/fullchain.pem'),
}, app);

//Az app nyitott portja
httpServer.listen(3900, () => {
  console.log('HTTP Server running on port 3900');
});

httpsServer.listen(444, () => {
  console.log('HTTPS Server running on port 444');
});