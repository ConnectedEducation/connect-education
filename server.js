// ConnectED Server

var express = require('express');
var app = express();
const port = 3000;

var fs = require('fs');

// TODO:
// Connect DB
// Complete some part of front end
// Set up static files and stuff
// Set up Socket.io

// Set up middleware.
var bodyparser = require('body-parser');

// Set the view engine as handlebars.
var hbs = require('express-handlebars');
app.engine('handlebars', hbs({extname: 'handlebars', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'handlebars');

// Use body-parser middleware. NOT REALLY USED YET...
app.use(bodyparser.urlencoded({extended: false}));

// Index
app.get('/', (req, res) => {
    // Make fake db full of todo items
    // Make it so render multiple todo items
    // Basically make this fetch all todo items (change route?)
    let userID = 0;
    let imgFile = 'test.jpg';

    res.render('index', { title: 'HEY', todoTitle: 'INFO 4105', todoBody: 'Search Engine Class',
    userName: 'Rusty Shackleford', avatarDir: '/user/' + userID + '/media/' + imgFile, userPage: '#'});
});

app.get('/user/:userID/media/:imgFile', (req, res) => {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile('.' + req.url, (err, data) => {
        res.writeHead(200, {"Content-Type": 'image/jpg'});
        res.write(data, 'binary');
        res.end();
    });
});

// General courses
app.get('/courses', (req, res) => {
    res.send('Got courses');
});

// Specific course
app.get('/courses/:courseID', (req, res) => {
    res.send('got course ' + req.params.courseId + '!');
});

// User profile
app.get('/user/:userId', (req, res) => {
    res.send('got user ' + req.params.userId + '!');
});

// Respond with CSS
app.get('/css/:cssfile', (req, res) => {
    fs.readFile('.' + req.url, (err, data) => {
        res.writeHead(200, {"Content-Type": 'text/css'});
        res.write(data);
        res.end();
    });
});

// Respond with JS
app.get('/js/:jsfile', (req, res) => {
    fs.readFile('.' + req.url, (err, data) => {
        res.writeHead(200, {"Content-Type": 'text/js'});
        res.write(data);
        res.end()
    });
});

// See whatever requests are leftover to be handled.
app.get(/.*/, (req, res) => {
    console.log(req.url);
    res.end();
});

// Start server
app.listen(port, function(){
    console.log("Listening on port", port, "... Press CTRL+C to stop.");
});