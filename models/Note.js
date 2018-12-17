const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('notes', NotesSchema);