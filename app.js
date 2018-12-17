const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const upload = require('express-fileupload');

const app = express()


// Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware upload
app.use(upload());


app.get('/', (req, res) => {
    res.render('index');
});


// Listen to port
const port = 9000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});