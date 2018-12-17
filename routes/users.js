const express = require('express');
const router = express.Router();


// User register route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// User login route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// export module
module.exports = router;