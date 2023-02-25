const express = require('express');
const router = express.Router();

// Create User using :POST "/signup" Doesn't require Auth
router.post('/signup', (request, response) => {
    response.send('User Created');
})

module.exports = router;
