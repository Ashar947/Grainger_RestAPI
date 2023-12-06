const mongoose = require('mongoose');
require('dotenv').config();

const replacementParts = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ReplacementParts', replacementParts);