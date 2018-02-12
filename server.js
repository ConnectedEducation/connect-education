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

// Fake user
let selectedUser = {
    userID: 0,
    userName: "Rusty Shackleford",
    avatarDir: '/user/0/media/test.jpg',
    todos: [{color: "#FF8A80", title: "Assignment 1", course: "INFO 4105", dueDate: "2/12/2018", description: "Lorem ipsum."},
    {color: "#FFD180", title: "Reading 1", course: "INFO 4200", dueDate: "2/14/2018", description: "Read this please."},
    {color: "#FFFF8D", title: "Project", course: "INFO 4300", dueDate: "3/20/2018", description: "Big project."},
    {color: "#CFD8DC", title: "Assignment 1", course: "INFO 4400", dueDate: "4/12/2018", description: "Florem blipsum."}]
    // add courses
    // add profile bio stuff

    /*
    COLORS:

    red: #FF8A80
    orange: #FFD180
    yellow: #FFFF8D
    grey: #CFD8DC
    */

}

// ONLY USE FOR STORING IN DB
function computeMediaDir(userID, fileName) {
    return '/user/' + userID + '/media/' + fileName;
}

// Set up middleware.
var bodyparser = require('body-parser');

// Set the view engine as handlebars.
var hbs = require('express-handlebars');
app.engine('handlebars', hbs({ extname: 'handlebars', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'handlebars');

// Use body-parser middleware. NOT REALLY USED YET...
app.use(bodyparser.urlencoded({ extended: false }));

// Index
app.get('/', (req, res) => {
    // Make fake db full of todo items
    // Make it so render multiple todo items
    // Basically make this fetch all todo items (change route?)

    res.render('index', {
        title: 'index', userName: selectedUser.userName,
        todos: selectedUser.todos, avatarDir: selectedUser.avatarDir
    });
});

app.get('/user/:userID/media/:imgFile', (req, res) => {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile('.' + req.url, (err, data) => {
        if (err) {
            // Try to make error visible to user instead
            console.log(err);
            // Try to serve null.jpg instead
        } else {
            res.writeHead(200, { "Content-Type": 'image/jpg' });
            res.write(data, 'binary');
            res.end();
        }
    });
});

app.get('/assets/images/:imgFile', (req, res) => {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile('.' + req.url, (err, data) => {
        if (err) {
            // Try to make error visible to user instead
            console.log(err);
            // Try to serve null.jpg instead
        } else {
            res.writeHead(200, { "Content-Type": 'image/jpg' });
            res.write(data, 'binary');
            res.end();
        }
    });
});

// General courses
app.get('/courses', (req, res) => {
    res.send('Got courses');
});

// Specific course
app.get('/courses/:courseID', (req, res) => {
    res.send("got course " + req.params.courseId + '!');
});

// User profile
app.get('/user/:userID', (req, res) => {
    res.send("got user " + req.params.userID + '!');
});

// Respond with CSS
app.get('/css/:cssfile', (req, res) => {
    fs.readFile('.' + req.url, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
            res.end();
        }
    });
});

// Respond with JS
app.get('/js/:jsfile', (req, res) => {
    fs.readFile('.' + req.url, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { "Content-Type": "text/js" });
            res.write(data);
            res.end()
        }
    });
});

// See whatever requests are leftover to be handled.
app.get(/.*/, (req, res) => {
    console.log(req.url);
    res.end();
});

// Start server
app.listen(port, function () {
    console.log("Listening on port", port, "... Press CTRL+C to stop.");
});