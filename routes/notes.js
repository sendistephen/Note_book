const express = require('express');
const router = express.Router();


// Notes route
router.get('/', (req, res) => {
    res.render('notes/viewNotes');
});

// Add notes route
router.get('/add', (req, res) => {
    res.render('notes/add');
});

module.exports = router;