const mongoose = require('mongoose');

const OrdersScheme = mongoose.Schema({
    orderid:{
        type: String,
        default: "",
    },
    u_email:{
        type: String,
        default: "",
    },
    u_firstname:{
        type: String,
        default: "",
    },
    u_name:{
        type: String,
        default: "",
    },
    u_legio:{
        type: String,
        default: "Magyarország",
    },
    u_postnumber:{
        type: String,
        default: "",
    },
    u_city:{
        type: String,
        default: "",
    },
    u_addresse:{
        type: String,
        default: "",
    },
    u_tel:{
        type: String,
        default: "",
    },
    shipping:{
        type: String,
        default: "",
    },


    status:{
        type: String,
        default: "pending",
    },
    createdtime:{
        type: Date,
        default: Date.now,
        required: true
    },
    cart:Array,
    szamlazasimod:{
        type: String,
        default: "same",
    },
    szamlazasOrszag:{
        type: String,
        default: "Magyarország",
    },
    szamlazasVezteknev:{
        type: String,
        default: "",
    },
    szamlazasUtonev:{
        type: String,
        default: "",
    },
    szamlazasIranyitoszam:{
        type: String,
        default: "",
    },
    szamlazasTelepules:{
        type: String,
        default: "",
    },
    szamlazasCim:{
        type: String,
        default: "",
    },
    szamlazasTel:{
        type: String,
        default: "",
    },
    usedcupon:{
        type: String,
        default: "",
    },
});

module.exports = mongoose.model('Orders', OrdersScheme);