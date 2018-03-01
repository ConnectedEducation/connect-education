// ConnectED Server

var express = require("express");
var app = express();
const port = 3000;

var MongoClient = require("mongodb").MongoClient;

let serverURL = "mongodb://localhost:27017/";
let dbName = "connected";

var fs = require("fs");

// TODO:
// Set up static files and stuff
// Set up Socket.io

// Fake user
let selectedUser = {
    userID: null,
    firstName: "lirstName",
    lastName: "lastName",
    avatarDir: "/user/null/media/null.jpg",
    userName: "NO_USER",
    todos: [],
    courses: [],
    bio: "No user selected."
};

// PUT INTO /login or something
// Change query to extract non-security related stuff--don't extract password or _id
function logIn(command) {
    MongoClient.connect(serverURL.concat(dbName), (err, db) => {
        if (err) {
            console.log("Could not connect to the database.");
            throw err; // Throw custom error object instead?
        }

        console.log("Successfully connected to the database.");

        db.db(dbName).collection("users").findOne({ userID: 0 }, (err, data) => {
            if (err) {
                throw err;
            };

            selectedUser = data;
            db.close();
        });
    });
}

// Move somewhere else?
logIn();

// Set up middleware.
var bodyparser = require("body-parser");

// Set the view engine as handlebars.
var hbs = require("express-handlebars");
app.engine("handlebars", hbs({ extname: "handlebars", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/" }));
app.set("view engine", "handlebars");

// Use body-parser middleware. NOT REALLY USED YET...
app.use(bodyparser.urlencoded({ extended: false }));

// Index
app.get("/", (req, res) => {
    // Make this into a login page?

    res.render("index", {
        todos: selectedUser.todos,
        userID: selectedUser.userID,
        title: "Dashboard",
        userName: selectedUser.userName,
        avatarDir: selectedUser.avatarDir
    });
});

// General courses
app.get("/courses", (req, res) => {
    res.render("courses", {
        courses: selectedUser.courses,
        userID: selectedUser.userID,
        title: "courses",
        userName: selectedUser.userName,
        avatarDir: selectedUser.avatarDir
    });
});

// Specific course
app.get("/courses/:courseID", (req, res) => {
    res.send("got course " + req.params.courseId + "!");
});

// User profile
app.get("/user/:userID", (req, res) => {
    //res.send("got user " + req.params.userID + "!");
    res.render("user", {
        bio: selectedUser.bio,
        userID: selectedUser.userID,
        title: selectedUser.firstName + " " + selectedUser.lastName,
        userName: selectedUser.userName,
        avatarDir: selectedUser.avatarDir
    });
});

// Create a todo
app.post("/todo", (req, res) => {
    console.log("Posted todo.");

    // Modularize this stuff
    MongoClient.connect(serverURL.concat(dbName), (err, db) => {
        if (err) {
            console.log("Error!");
            db.close();
        }

        try {
            db.db(dbName).collection("users").updateOne({ userID: selectedUser.userID }, { $push: { todos: req.body } });
            selectedUser.todos.push(req.body);
        } catch (e) {
            console.log(e);
        }

        db.close();

        res.redirect('/');
    });
});

// File serving functions and routes:

// General file-fetching function
function fetchFile(req, res) {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile("." + req.url, (err, data) => {
        if (err) {
            console.log("Error fetching file at '." + req.url + "'.");
        } else {

            let contentTypeMap = {
                ".css": "text/css",
                ".ico": "image/x-icon",
                ".js": "text/js",
                ".jpg": "image/jpg",
                ".png": "image/png"
            }

            let contentType = contentTypeMap[req.url.match(/\.\w+$/)];

            res.writeHead(200, { "Content-Type": contentType });
            res.write(data);
        }
        res.end();
    });
}

// Respond with CSS
app.get("/css/:cssFile", (req, res) => {
    fetchFile(req, res);
});

// Respond with JS
app.get("/js/:jsFile", (req, res) => {
    fetchFile(req, res);
});

app.get("/user/:userID/media/:imgFile", (req, res) => {
    fetchFile(req, res);
});

app.get("/assets/images/:imgFile", (req, res) => {
    fetchFile(req, res);
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