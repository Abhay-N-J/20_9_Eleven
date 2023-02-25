const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const userModel = require('../models/userModel')
const productModel = require('../models/productModel')
const shopModel = require('../models/shopModel')
import geofence from "./../geofencing/geofencing"

const saltRounds = 10

router.post('/signup', (request, response, next) => {
    try {
        console.log(request.body)
        bcrypt.hash(request.body.password, saltRounds)
            .then(hash => {
                const userTemplate = new userModel({
                    username: request.body.username,
                    password: hash,
                    email: request.body.email,
                    location: request.body.location,
                    address: request.body.address
                })
                userTemplate.save((err, data) => {
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
        console.log(request.body)
        const user = {
            username: request.body.username,
        };
        // response.json({ msg: "Login Successful" });

        userModel.findOne(user)
            .then((user) => {
                // user exists
                console.log(user);
                if (bcrypt.compareSync(request.body.password, user.password)) {
                    response.json(user);
                }
                else {
                    response.status(400).json({ sucess: "false", msg: "Invalid password" });
                }
            })

            // response.json({hash:hash, pass:user.password })

            .catch((error) => {
                response.status(400).json({ msg: "err" });
            })

    }
    catch (err) {
        next(err);
    }
})

router.get('/products/:lat/:lng', (request, response, next) => {
    try {
        console.log(request.params)
        const userLat = request.params.lat
        const userLng = request.params.lng
        shopModel.find()
            .then((shops) => {
                // user exists
                console.log(shops);
                var shopList = []
                var productList=[]
                shops.forEach(shop => {
                    if (geofence(userLat, userLng, shop.location.lat, shop.location.lng)) {
                        shopList.push(shop)
                        productList.push(shop.products)
                    }
                });
                console.log(shopList)
                response.json(shopList)
            })
    }
    catch (err) {
        next(err);
    }
})



router.use((err, req, res, next) => {
    console.error(err.stack)
    console.log("Error Occured")
    response.status(400).json({
        success: false,
        code: 69,
        message: 'Some Error occured',
        errors: "Random Error",
    });
})

module.exports = router;
