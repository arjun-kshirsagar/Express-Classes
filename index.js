const express = require('express');
const mongoose = require('mongoose');

mongoose.connect()
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB", err);
});


// ProductSchema
const productSchema = new mongoose.Schema({
    // mongoDB will by default genrate the id, we dont need to crate that
    // product_name: String, // wrong way, intialize it as a object
    product_name: {
        type: String,
        required: true
    },  // right way
    product_price: {
        type: String, // to add the currency symbol
        required: true
    }, 
    isInStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Furniture']
    }
});

const app = express();

app.listen(8086, () => {
    console.log('Listening on port 8086...');
});