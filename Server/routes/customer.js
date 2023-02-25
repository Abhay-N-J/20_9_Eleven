const express = require('express');
const router = express.Router();

const userModel= require('../models/userModel')


router.post('/signup', (request, response) => {
    response.send('User Created');
})

module.exports = router;
