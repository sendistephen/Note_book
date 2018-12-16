const express = require('express');
const exphbs = require('express-handlebars');

const app = express()


// Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});


// Listen to port
const port = 9000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});