const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const fetchUser = require('../middleware/fetchUser');

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

// Obtener nuevas colecciones
router.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollections = products.slice(1).slice(-8);
        console.log("NewCollections Fetched");
        res.send(newcollections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener productos populares en la categoría de mujeres
router.get('/popularInWomen', async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popularInWomen = products.slice(0, 4);
        console.log("Popular in women fetched");
        res.send(popularInWomen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Agregar al carrito de compras
router.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added" , req.body.itemId)
    let userData = await Users.findOne({_id : req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
    res.send({message : "Product added"});
});

router.post('/removefromcart', fetchUser, async(req,res) =>{
    console.log("Removed" , req.body.itemId)
    let userData = await Users.findOne({_id : req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId]-=1;
    }
    await Users.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
    res.send({message : "Product removed"});
})

router.post('/getCart' , fetchUser , async(req,res)=>{
    console.log("Get cart");
    let userData = await Users.findOne({_id : req.user.id});
    res.json(userData.cartData);
})

module.exports = router;

