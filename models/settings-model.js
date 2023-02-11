const mongoose = require('mongoose');

const SettingsScheme = mongoose.Schema({
    name:{
        type: String,
        default: "",
        required: true
    },
    value:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('Settings', SettingsScheme);