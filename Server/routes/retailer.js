const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const retailModel = require('../models/retailerModel')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const saltRounds = 10

router.post('/signup', (request, response, next) => {
    try {
        bcrypt.hash(request.body.password, saltRounds)
            .then(hash => {
                const retailTemplate = new retailModel({
                    username: request.body.username,
                    name: request.body.name,
                    password: hash,
                    email: request.body.email,
                    location: request.body.location,
                    address:request.body.address,
                    products: []
                })
                retailTemplate.save((err, data) => {
                    if (err) {
                        if (err.code === 11000) {
                            // Duplicate username
                            return response.status(400).json({
                                success: false,
                                code: 11000,
                                message: 'Username already exist!',
                                errors: "Username already exists",
                            });
                        }

                        // Some other error
                        err.success = false;
                        return response.status(400).json(err);
                    }
                    data.success = true;
                    response.json(data);
                })
            })
    }
    catch (err) {
        next(err);
    }

})

router.post('/login', (request, response, next) => {
    try {
        const user = {
            username: request.body.username,
        };
        // response.json({ msg: "Login Successful" });

        retailModel.findOne(user)
            .then((user) => {
                // user exists
                if (user) {
                    bcrypt.compare(request.body.password, user.password)
                        .then((result) => {
                            if (result) {
                                response.json(user);
                            }
                            else {
                                response.status(400).json({
                                    success: false,
                                    code: 69,
                                    message: 'Incorrect Password',
                                    errors: "Incorrect Password",
                                });
                            }
                        })
                }
                else {
                    response.status(400).json({
                        success: false,
                        code: 69,
                        message: 'User does not exist',
                        errors: "User does not exist",
                    });
                }
            })
    }
    catch (err) {
        next(err);
    }
})

router.get('/product/:id', (req, res, next) => {
    try {
        const request = req.params.id;
        let products = retailModel.find({_id: ObjectId(request)})
            .then((product) => {
                res.send(product)
            })
    }
    catch (err) {
        next(err);
    }
})

router.put('/product-update', (req, res, next) => {
    try {
        // Product updation fields coming
        /*
        product_id:
        shop_id:
        shop_name:
        qty:
        */
        productModel.findOne({ _id: req.body.product_id })
            .then((product) => {
                product.shops.forEach((shop) => {
                    if (shop.shop_id === req.body.shop_id) {
                        shop.qty += req.body.add ? 1 : shop.qty === 0 ? 0 : -1; 
                        res.send(shop.qty)
                    }
                })
                product.save()
            })
    }
    catch (err) {
        next(err);
    }
})


router.put('/add-item', async (req, res, next) => {
    try {
        let product = await productModel.findOne({ name: req.body.name })
        if (!product) {
            product = new productModel({
                name: req.body.name,
                qty: req.body.qty,
                price: req.body.price,
                image_link: req.body.image_link,
                shops: [{
                    shop_id: req.body.shop_id,
                    quantity: req.body.qty,
                    shop_name: req.body.shop_name
                }],
                description: req.body.description
            })
            product.save()
                .then(() => {
                    retailModel.find(req.body.shop_id)
                        .then((retailer) => {
                            retailer.products.push({
                                product_id: product._id,
                                product_name: product.name,
                                quantity: product.qty
                            })
                            res.send(product)
                        })

                })
        }
        else {
            product.shops.push({
                shop_id: req.body.shop_id,
                quantity: req.body.qty,
                shop_name: req.body.shop_name
            })
            product.save()
            res.send(product)
        }
    }
    catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    // console.error(err.stack)
    res.status(400).json({
        success: false,
        code: 69,
        message: 'Some Error occured',
        errors: "Random Error",
    });
})


module.exports = router;