const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const userModel = require('../models/userModel')
const saltRounds = 10

router.post('/signup', (request, response, next) => {
    try {
        bcrypt.hash(request.body.passwd, saltRounds)
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
        const user = {
            username: request.body.username,
        };

        userModel.findOne(user)
            .then((user) => {
                // user exists
                // response.json(user);
                if (bcrypt.compareSync(request.body.password, user.password)) {
                    response.json(user);
                }
                else {
                    response.status(400).json({ sucess: "false", msg: "Invalid password" });
                }
            })

            // response.json({hash:hash, pass:user.password })

            .catch((error) => {
                response.status(400).json(error);
            })
    }
    catch (err) {
        next(err);
    }
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
