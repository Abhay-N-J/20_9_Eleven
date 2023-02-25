const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const retailModel = require('../models/retailerModel')
const saltRounds = 10

router.post('/signup', (request, response, next) => {
    try {
        bcrypt.hash(request.body.passwd, saltRounds)
        .then(hash => {
            const retailTemplate = new retailModel({
                username: request.body.username,
                name: request.body.name,
                password: hash,
                email: request.body.email,
                location: request.body.location,
                products: request.body.products
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
    catch(err) {
        next(err);
    }
    
})


router.post('/add-item', (req, res, next) => {
    
})

router.use((err, req, res, next) => {
    // console.error(err.stack)
    response.status(400).json({
        success: false,
        code: 69,
        message: 'Some Error occured',
        errors: "Random Error",
    });
})


module.exports = router;