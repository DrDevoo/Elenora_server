const mongoose = require('mongoose');

const LogsScheme = mongoose.Schema({
    action:{
        type: String,
        default: "",
        required: true
    },
    date:{
        type: String,
        default: "",
        required: true
    },
    os:{
        type: String,
        default: "",
        required: true
    }
});

module.exports = mongoose.model('Logs', LogsScheme);