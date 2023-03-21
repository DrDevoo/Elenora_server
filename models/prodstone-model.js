const mongoose = require('mongoose');

const ProductsStoneScheme = mongoose.Schema({
    prodname:{
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
});

module.exports = mongoose.model('ProductsStone', ProductsStoneScheme);