const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express()

// Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// load static files
app.use(express.static('public'))
app.use(express.static('files'))

app.use('/static', express.static(path.join(__dirname, 'public')))

// Load routes
const users = require('./routes/users');

// Global variables
// app.use(function (req,res, next) {
//     res.locals.user = req.user || null;
//     next()
// });

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Use routes
app.use('/users', users);

const port = 9000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});