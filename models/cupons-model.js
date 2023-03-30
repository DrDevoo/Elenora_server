const mongoose = require('mongoose');

const CuponsScheme = mongoose.Schema({
    cupon_name:{
        type: String,
        default: "",
        required: true
    },
    cupon_value:{
        type: Number,
        default: 0,
        required: true
    },
    cupon_used:{
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Cupons', CuponsScheme);