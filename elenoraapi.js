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

//Kulso komponensel hasznalata
app.use('/products', productsRoute)
app.use('/getimage', getimage)
app.use('/collections', collectionsRoute)
app.use('/cupons', cuponsRoute)
app.use('/inventory', inventoryRoute)
app.use('/admin', adminRoute)

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

//Az app nyitott portja
app.listen(process.env.API_PORT);
console.log("---A szerver elérhető a "+process.env.API_PORT+" porton---")