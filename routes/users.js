const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// load user model
require('../models/User');
const User = mongoose.model('users');

// User register route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// User login route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// process login form
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    
});


// process user register form
router.post('/register', (req, res) => {
    // check for errors
    let errors = [];

    if (!req.body.username) {
        errors.push({
            text: 'Username missing'
        });
    }
    if (!req.body.email) {
        errors.push({
            text: 'Email missing'
        });
    }
    if (!req.body.password) {
        errors.push({
            text: 'Password missing'
        });
    }
    if (req.body.password != req.body.password2) {
        errors.push({
            text: 'Passwords dont match'
        });
    }
    if (req.body.password.length < 4) {
        errors.push({
            text: 'Password must be morethan 4 characters.'
        });
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        // check if user already exists
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    req.flash('success_msg', 'User with that email already exists...');
                    res.redirect('/users/login');
                } else {
                    // register new user
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });
                    // salt the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // set password of the new user to the hashed password
                            newUser.password = hash;

                            // save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You have been registered successfully. Please login');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });

                    });
                }
            });

    }


});

// export module
module.exports = router;