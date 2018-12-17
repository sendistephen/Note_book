const express = require('express');
const router = express.Router();

// load user model
require('../models/User');

// User register route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// User login route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// register post request
// router.post('/register', (req,res) => {
//     const newUser = new User({
//         username: req.username,
//         email: req.email,
//         password: req.password
//     });
//     console.log(req.body);
// });

// export module
module.exports = router;