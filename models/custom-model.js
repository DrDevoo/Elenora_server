const mongoose = require('mongoose');

const CustomProdScheme = mongoose.Schema({
    pearl:{
        type: String,
        default: "",
        required: true
    },
    tcolor:{
        type: String,
        default: "",
    },
    text:{
        type: String,
        default: "",
    },
    size:{
        type: String,
        default: "",
    },
    pearls:Array,
});

module.exports = mongoose.model('CustomProd', CustomProdScheme);