const mongoose = require('mongoose');

const ProductsScheme = mongoose.Schema({
    prodname:{
        type: String,
        default: "",
        required: true
    },
    description:{
        type: String,
        default: "",
        required: true
    },
    price:{
        type: Number,
        default: 0,
        required: true
    },
    image:{
        type: String,
        default: "46bea41c0363d722467defc2f1ecc234",
        required: true
    },
    image2:{
        type: String,
        default: "46bea41c0363d722467defc2f1ecc234",
        required: true
    },
    image3:{
        type: String,
        default: "46bea41c0363d722467defc2f1ecc234",
        required: true
    },
    collections:{
        type: String,
        default: "",
        required: true
    },
    categ:{
        type: String,
        default: "",
        required: true
    },
    colors:{
        type: String,
        default: "",
    },
    pearls:Array,
    status:{
        type: String,
        default: "active",
        required: true
    },
});

module.exports = mongoose.model('Products', ProductsScheme);