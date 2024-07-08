const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());    // middleware to parse the body of the request

mongoose.connect("")
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
        // enum: ['Electronics', 'Clothing', 'Books', 'Furniture']
    }
});

const productModel = mongoose.model('Products', productSchema); // we need to pass the ref of the schema in this model

// create 
app.post('/api/products', async (req, res) => {
    const body = req.body;
    const product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        isInStock: req.body.isInStock,
        category: req.body.category
    };

    console.log(product);
    return res.status(201).json({MessageChannel: "Product created successfully"});
    // try {
    //     const result = await product.save();
    //     res.send(result);
    // } catch (err) {
    //     res.status(400).send(err);
    // }
});


app.listen(8086, () => {
    console.log('Listening on port 8086...');
});