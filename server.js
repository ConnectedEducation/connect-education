// ConnectED Server

var express = require('express');
var app = express();
const port = 3000;

// TODO:
// Connect DB
// Complete some part of front end
// Set up static files and stuff
// Set up Socket.io

// Set up middleware.
var bodyparser = require('body-parser');

// Set the view engine as handlebars.
app.set('view engine', 'handlebars');

// Use body-parser middleware. NOT REALLY USED YET...
app.use(bodyparser.urlencoded({extended: false}));

// Index
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// General courses
app.get('/courses', (req, res) => {
    res.send('Got courses');
});

// Specific course
app.get('/courses/:courseId', (req, res) => {
    res.send('got course ' + req.params.courseId + '!');
});

// User profile
app.get('/user/:userId', (req, res) => {
    res.send('got user ' + req.params.userId + '!');
});

// Start server
app.listen(port, function(){
    console.log("Listening on port", port, "... Press CTRL+C to stop.");
});