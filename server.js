// ConnectED Server

/*
    TODO (In no particular order):
    * Profile full pages
    * editTodo()
    * deleteTodo()
    * Login page
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
    firstName: "firstName",
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

            if (data != null) {
                selectedUser = data;
                console.log("Successfully logged in. UserID:", userID);
            } else {
                console.log("No such user found.");
            }

            db.close();
        });
    });
}

// Move somewhere else? Like /login?
logIn(0);

// dbFind({ userID: 0 }, "users", (data) => {console.log(data)});
// => [data]
function dbFind(query, collection, cb) {
    MongoClient.connect(serverURL.concat(dbName), (err, db) => {
        if (err) {
            throw err;
        }

        try {
            db.db(dbName).collection(collection).find(query).toArray((err, result) => {
                if (err) throw err;
                console.log(result);
                if (typeof cb === "function") {
                    cb(result);
                }
                db.close();
            });

        } catch (e) {
            console.log(e);
        }
    });
}

// Index
app.get("/", (req, res) => {
    res.render("login", {
        todos: selectedUser.todos,
        userID: selectedUser.userID,
        title: "ConnectED",
        userName: selectedUser.userName,
        avatarDir: selectedUser.avatarDir
    });
});

app.get("/views/index.handlebars", (req, res) => {
    dbFind( {todoID: 0}, "todos", (result) => {
        serveView(req, res, { todos: result });
    });
    // Serve view, then ajax call for todos...
});

// General courses
app.get("/views/courses.handlebars", (req, res) => {
    serveView(req, res, { courses: selectedUser.courses });
});

// Specific course
app.get("/courses/:courseID", (req, res) => {
    // TODO: Get and send course information.
    // TODO: Maybe make new course collection? Store courses as objects?

    // Serve course description
    //let course =
    serveView(req, res, { courseTitle: req.params.courseID }, "/views/course.handlebars");
});

// User profile
// TODO: Switch back to /user/:userID
app.get("/user/:userID", (req, res) => {
    // TODO: Get user from database using UserID
    console.log("User route");
    serveView(req, res, { bio: selectedUser.bio, userName: selectedUser.userName, avatarDir: selectedUser.avatarDir }, "/views/user.handlebars");
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
    serveFile(req, res);
});

app.get("/js/:jsFile", (req, res) => {
    serveFile(req, res);
});

app.get("/user/:userID/media/:imgFile", (req, res) => {
    serveFile(req, res);
});

app.get("/assets/images/:imgFile", (req, res) => {
    serveFile(req, res);
});

// General file-fetching function
function serveFile(req, res, url /*To override auto url*/) {
    // TODO: Do error handling! Make sure the file exists before sending it.
    if (!url) {
        url = req.url;
    }

    fs.readFile("." + url, (err, data) => {
        if (err) {
            console.log("Error fetching file at '." + url + "'.");
        } else {

            let contentTypeMap = {
                ".css": "text/css",
                ".ico": "image/x-icon",
                ".html": "text/html",
                ".js": "text/js",
                ".jpg": "image/jpg",
                ".png": "image/png"
            }

            let contentType = contentTypeMap[url.match(/\.\w+$/i)];

            res.writeHead(200, { "Content-Type": contentType });
            res.write(data);
        }
        res.end();
    });
}

function serveView(req, res, data, url) {

    if (!url) {
        url = req.url;
    }

    console.log("URL:", url);

    fs.readFile("." + url, (err, result) => {
        if (err) {
            console.log("Error fetching file at '." + url + "'.");
        } else {
            let contentTypeMap = {
                ".html": "text/html",
                ".handlebars": "text/html"
            }

            let contentType = contentTypeMap[url.match(/\.\w+$/i)];

            let viewData = {
                view: result.toString(),
                data: data
            }

            res.writeHead(200, { "Content-Type": contentType });
            res.write(JSON.stringify(viewData));
            console.log("Served view:", url);
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