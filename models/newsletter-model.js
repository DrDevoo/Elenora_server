const mongoose = require('mongoose');

const NewsletterScheme = mongoose.Schema({
    name:{
        type: String,
        default: "",
        required: true
    },
    email:{
        type: String,
        default: "",
        required: true
    },
    Date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Newsletter', NewsletterScheme);