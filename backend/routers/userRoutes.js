const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const jwt = require('jsonwebtoken'); // Requerir jsonwebtoken
require('dotenv').config({ path: '../.env' });

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });

    if (check) {
        return res.status(400).json({ success: false, error: "Existing user found with same email address" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, SECRET_KEY);
    res.json({ success: true, token });
});

router.post('/login' , async (req,res)=>{

    let user = await Users.findOne({ email: req.body.email });

    if (user){
        const passCompare = req.body.password === user.password;
        if ( passCompare ) {
            const data = {
                user : {
                    id : user.id,
                }
            }
            const token = jwt.sign(data , SECRET_KEY);
            res.json({success : true , token});
        }
        else {
            res.json({success : false , errors : "Wrong password"})
        }
    }
    else{
        res.json({success : false , error : "Wrong email id"})
    }

})

module.exports = router;
