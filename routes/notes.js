const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load note model
require('../models/Note');
const Note = mongoose.model('notes');

// Notes route
router.get('/', (req, res) => {
    res.render('notes/viewNotes');
});

// Retrieve all notes ideas from the database
router.get('/notes', (req, res) => {
    Note.find({})
    .sort({date: 'desc'})
    .then(notes => {
        res.render('notes/viewNotes', {
            notes:notes
        });
    });
});

// Add notes route
router.get('/add', (req, res) => {
    res.render('notes/add');
});

// process the notes form
router.post('/', (req, res) => {
    // capture form errors
    let errors = [];
    // check if user inputs title
    if (!req.body.title) {
        errors.push({
            text: 'Please add a title for the idea'
        })
    }
    // check if user inputs notes
    if (!req.body.notes) {
        errors.push({
            text: 'Please add notes describing your idea'
        })
    }
    // check if there are any errors
    if (errors.length > 0) {
        res.render('notes/add', {
            errors: errors,
            title: req.body.title,
            notes: req.body.notes
        });
    } else {
        // save data to the database
        const newNote = {
            title: req.body.title,
            notes: req.body.notes
        }
        new Note(newNote).save()
            .then(idea => {
                res.redirect('notes/');
            })

    }

});

module.exports = router;