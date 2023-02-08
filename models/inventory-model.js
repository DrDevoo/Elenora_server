const mongoose = require('mongoose');

const InventoryScheme = mongoose.Schema({
    item_name:{
        type: String,
        default: "",
        required: true
    },
    item_quantity:{
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Inventory', InventoryScheme);