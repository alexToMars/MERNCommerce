const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Eliminar un producto
router.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Obtener todos los productos
router.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products Fetched");
    res.send(products);
});

// Añadir un nuevo producto
router.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    try {
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/newcollections' ,async (req,res) =>{
    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    console.log("NewCollections Fetched");
    res.send(newcollections);
});

module.exports = router;
