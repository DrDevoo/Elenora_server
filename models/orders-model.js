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
        default: "",
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

    createdtime:{
        type: Date,
        default: Date.now,
        required: true
    },
    cart:Array,
});

module.exports = mongoose.model('Orders', OrdersScheme);