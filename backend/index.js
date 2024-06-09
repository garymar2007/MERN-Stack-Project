const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

// middleware to get json body from request
app.use(express.json());
app.use(cors({origin: true}));

app.post('/register', async(req, res) => {
    console.log('Received from client...');
    console.log(req.body);
    let user = new User(req.body);
    let result = await user.save();
    console.log(result);
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token) => {
        if (err) {
            res.send({"result": "Somethng went wrong, please retry after sometime."});
        }
        res.send({result, auth: token});
    });
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token) => {
                if (err) {
                    res.send({"result": "Somethng went wrong, please retry after sometime."});
                }
                res.send({user, auth: token});
            });
            
        } else {
            res.send({"result": "No user found"});
        }
    } else {
        res.send({"result": "Incorrect Username or Password"});
    }
    
    
})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    result = result.toObject();
    
    res.send(result);
})

app.get("/products", async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({result: "No Product found"});
    }
})

app.delete("/product/:id", async (req, res) => {
    console.log(req.params.id);
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({result: "Product not found!"});
    }
   
})

app.put("/product/:id/update-product", async (req, res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    );
    res.send(result);
})

app.get("/search/:key", async (req, res) => {
    let result  = await Product.find({
        "$or": [
            {
                name: {$regex: req.params.key}
            },
            {
                price: {$regex: req.params.key}
            },
            {
                category: {$regex: req.params.key}
            },
            {
                company: {$regex: req.params.key}
            }
        ]
    });
    res.send(result);
})

app.listen(5000);