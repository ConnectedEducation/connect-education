// ConnectED Server

/*
    TODO (In no particular order):
    * Course full pages instead of enlarged view in modal?
    * Profile full pages
    * editTodo()
    * deleteTodo()
    * Login page
    * SPA-ify
    * Set up Socket.io
*/

var express = require("express");
var app = express();
const port = 3000;
var fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));

var hbs = require("express-handlebars");
app.engine("handlebars", hbs({ extname: "handlebars", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/" }));
app.set("view engine", "handlebars");

let serverURL = "mongodb://localhost:27017/";
let dbName = "connected";

// Hmm change this. Not sure if server would for multiple users with this set up. Use sessions instead?
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

// TODO: Change to accept username and password and change query to extract non-security related stuff--don't extract password or _id
function logIn(userID) {
    MongoClient.connect(serverURL.concat(dbName), (err, db) => {
        if (err) { throw err; /* Throw custom error object instead? */ }

        db.db(dbName).collection("users").findOne({ userID: userID }, (err, data) => {
            if (err) { throw err; };
            selectedUser = data;
            db.close();
        });
    });
}

// Move somewhere else? Like /login?
logIn(0);

// Index
app.get("/", (req, res) => {
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

app.get("/css/:cssFile", (req, res) => {
    fetchFile(req, res);
});

app.get("/js/:jsFile", (req, res) => {
    fetchFile(req, res);
});

app.get("/user/:userID/media/:imgFile", (req, res) => {
    fetchFile(req, res);
});

app.get("/assets/images/:imgFile", (req, res) => {
    fetchFile(req, res);
});

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

// See whatever requests are leftover to be handled.
app.get(/.*/, (req, res) => {
    console.log(req.url);
    res.end();
});

app.listen(port, function () {
    console.log("Listening on port", port, "... Press CTRL+C to stop.");
});