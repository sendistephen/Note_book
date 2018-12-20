const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load note model
require('../models/Note');
const Note = mongoose.model('notes');

// Retrieve all notes ideas from the database
router.get('/', (req, res) => {
    Note.find({})
        .sort({
            date: 'desc'
        })
        .then(notes => {
            res.render('notes/notes', {
                notes: notes
            });
        });
});

// Add notes route
router.get('/add', (req, res) => {
    res.render('notes/add');
});

// Edit notes route
router.get('/edit/:id', (req, res) => {
    Note.findOne({
            _id: req.params.id
        })
        .then(note => {
            res.render('notes/edit', {
                note: note
            });
        });

});

// process edit form
router.put('/:id', (req, res) => {
    // get the data to update
    Note.findOne({
            _id: req.params.id
        })
        .then(note => {
            // set new values
            note.title = req.body.title;
            note.notes = req.body.notes;

            note.save()

                .then(note => {
                    req.flash('success_msg', 'Record updated successfully!!!');
                    res.redirect('/notes');
                });
        });
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
                req.flash('success_msg', 'Record added successfully!!!');
                res.redirect('/notes');
            })

    }

});

// Delete record
router.delete('/:id', (req, res) => {
    Note.remove({
            _id: req.params.id
        })
        .then(() => {
            req.flash('success_msg', 'Record deleted successfully!!!');
            res.redirect('/notes');
        });
});

module.exports = router;