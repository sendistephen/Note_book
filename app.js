const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express()

// connect to the database
mongoose.connect('mongodb://localhost:27017/notesIdea', {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

// Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body-parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(methodOverride('_method'));

// session middleware
app.use(session({
    secret: 'this is a secret key',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash());

// set global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next()
});

// load static files
app.use(express.static('public'))
app.use(express.static('files'))

app.use('/static', express.static(path.join(__dirname, 'public')))

// load routes
const notes = require('./routes/notes');
const users = require('./routes/users');

// passport config
require('./config/passport')(passport);

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Use routes
app.use('/notes', notes);
app.use('/users', users);

const port = 9000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});