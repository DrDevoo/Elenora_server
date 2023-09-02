const mongoose = require('mongoose');

const InvoicesScheme = mongoose.Schema({
    orderid:{
        type: String,
        default: "",
        required: true
    },
    invoiceid:{
        type: String,
        default: "",
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Invoices', InvoicesScheme);