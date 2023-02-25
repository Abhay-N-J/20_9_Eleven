const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const userModel = require('../models/userModel')
const productModel = require('../models/productModel')
const shopModel = require('../models/retailerModel')
const geofence = require("./../geofencing/geofencing");
const orderModel = require('../models/orderModel');

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
                    response.json({ success: "true", user: user });
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
                var productList = []
                var prod = []
                var radius = 2000// 2km
                shops.forEach(shop => {
                    if (geofence(userLat, userLng, shop.location.lat, shop.location.lng)) {
                        shopList.push(shop)
                        shop.productList.forEach(prod => {
                            // add only unique elements
                            if (!productList.includes(prod.product_id)) {
                                productList.push(prod.product_id)
                            }
                        }, function () {
                            // find productList ids in productModel in prod array
                            productModel.find({ _id: { $in: productList } }, function (err, docs) {
                                prod = docs
                            })
                            response.send(prod)
                        })
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

router.get('/get-shops-closest/:lat/:lng', (request, response, next) => {
    const userLat = request.params.lat
    const userLng = request.params.lng
    shopModel.find()
        .then((shops) => {
            // user exists
            console.log(shops);
            var shopList = []
            var productList = []
            var prod = []
            var radius = 2000// 2km
            shops.forEach(shop => {
                if (geofence(userLat, userLng, shop.location.lat, shop.location.lng)) {
                    shopList.push(shop)
                }
            });
            console.log(shopList)
            response.json(shopList)
        })
})

router.post('/order/:lat/:lng', (req, res, next) => {
    try {
        console.log(req.body.shopList)
        // use products array and check the frequency of shops which occur the most in productModel
        // then use that shop to place the order
        var obj={};

        var k = productModel.find({ _id: { $in: req.body.products } })
            .then(() => {
                console.log(k)
                for (var i=0; i<k.length;i++){
                    // count frequency of shopList in k
                    var shopList = k[i].shopList
                    var obj={}
                    for (var j=0; j<k[i].shop.length;j++){
                        if (shopList.includes(obj[k[i].shop[j]]))
                        if (obj[k[i].shop[j]]){
                            obj[k[i].shop[j]]+=1
                        }
                        else{
                            obj[k[i].shop[j]]=1
                        }
                    }
                }
                // find max value in the obj
                var max = 0
                var shop = ""
                for (var key in obj){
                    if (obj[key]>max){
                        max = obj[key]
                        shop = key
                    }
                }
                // place order in shop

                var order= new orderModel(req.body.order)
                .then(()=>{
                    order.save()
                    res.json({success:true, msg:"Order Placed"})
                })
                .catch((err)=>{
                    res.json({success:false, msg:"Error Occured"})
                })

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
