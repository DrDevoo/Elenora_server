const mongoose = require('mongoose');

const CollectionScheme = mongoose.Schema({
    col_name:{
        type: String,
        default: "",
        required: true
    },
    col_type:{
        type: String,
        default: "",
        required: true
    },
    col_gender:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('ProdCollection', CollectionScheme);