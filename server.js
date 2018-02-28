// ConnectED Server

var express = require("express");
var app = express();
const port = 3000;

var MongoClient = require("mongodb").MongoClient;

let serverUrl = "mongodb://localhost:27017/";
let dbName = "connected";

var fs = require("fs");

// TODO:
// Create and store new TODO item
// Complete some part of front end
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
MongoClient.connect(serverUrl.concat(dbName), (err, db) => {
    if (err) {
        console.log("Error!");
        db.close();
    }

    console.log("Connected to database!");

    let connectEd = db.db("connected");

    connectEd.collection("users").findOne({
        userID: 0
    }, (err, data) => {
        if(err) {
            throw err;
        };
        console.log(JSON.stringify(data));
        selectedUser = data;
        db.close();
    });
});

// ONLY USE FOR STORING IN DB
function computeMediaDir(userID, fileName) {
    return "/user/" + userID + "/media/" + fileName;
}

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
    // Make fake db full of todo items
    // Make it so render multiple todo items
    // Basically make this fetch all todo items (change route?)

    // Make this into a login page?

    res.render("index", {
        todos: selectedUser.todos,
        userID: selectedUser.userID,
        title: "Dashboard",
        userName: selectedUser.userName,
        avatarDir: selectedUser.avatarDir
    });
});

app.get("/user/:userID/media/:imgFile", (req, res) => {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile("." + req.url, (err, data) => {
        if (err) {
            // Try to make error visible to user instead
            console.log(err);
            // Try to serve null.jpg instead
        } else {
            res.writeHead(200, { "Content-Type": "image/jpg" });
            res.write(data, "binary");
        }
        res.end();
    });
});

app.get("/assets/images/:imgFile", (req, res) => {
    // TODO: Do error handling! Make sure the file exists before sending it.
    fs.readFile("." + req.url, (err, data) => {
        if (err) {
            // Try to make error visible to user instead
            console.log(err);
            // Try to serve null.jpg instead
        } else {
            // JPG default
            let fileType = "jpg";

            if (req.params.imgFile.match(/.ico/)){
                fileType = "x-icon"
            } else {
                fileType = req.params.imgFile.match(/.w+$/);
            }

            console.log("Loaded", req.params.imgFile);

            res.writeHead(200, { "Content-Type": "image/" + fileType });
            res.write(data, "binary");
        }
        res.end();
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
    //res.send("Got courses");
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

// Respond with CSS
app.get("/css/:cssfile", (req, res) => {
    fs.readFile("." + req.url, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
        }
        res.end();
    });
});

// Respond with JS
app.get("/js/:jsfile", (req, res) => {
    fs.readFile("." + req.url, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { "Content-Type": "text/js" });
            res.write(data);
        }
        res.end();
    });
});

app.post("/post-todo", (req, res) => {
    console.log('POST POST POST');
    console.log(req.body);


    // Modularize this stuff
    MongoClient.connect(serverUrl.concat(dbName), (err, db) => {
        if (err) {
            console.log("Error!");
            db.close();
        }
    
        let connectEd = db.db("connected");

        try {
            connectEd.collection("users").updateOne({userID: selectedUser.userID}, {$push: {todos: req.body}});
            selectedUser.todos.push(req.body);
        } catch (e) {
            console.log(e);
        }

        db.close();

        // Reusing... clean code later
        res.render("index", {
            todos: selectedUser.todos,
            userID: selectedUser.userID,
            title: "Dashboard",
            userName: selectedUser.userName,
            avatarDir: selectedUser.avatarDir
        });
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