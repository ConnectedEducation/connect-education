// ConnectED Server

/*
    TODO (In no particular order):
    * editTodo()
    * deleteTodo()
    * implement sessions
    * "add contact" functionality
*/

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

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

app.post("/login", (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data;
    });

    req.on("end", () => {
        body = JSON.parse(body);

        dbFind({ userID: Number(body.userID), firstName: body.password }, "users",
            (result) => {
                if (result.length > 0) {
                    selectedUser = result[0];
                    console.log("Logged in:", selectedUser);
                    res.writeHead(200);
                    res.write(JSON.stringify({
                        userID: result[0].userID,
                        avatarDir: result[0].avatarDir,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName
                    }));
                } else {
                    console.log("USER NOT FOUND");
                    res.writeHead(401);
                }
                res.end();
            });
    });
});

// Index
app.get("/", (req, res) => {
    res.render("login", {
        todos: selectedUser.todos,
        title: "ConnectED",
        userID: selectedUser.userID,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        avatarDir: selectedUser.avatarDir
    });
});

// Serve dashboard
app.get("/dashboard", (req, res) => {
    dbFind({ userID: selectedUser.userID }, "users", (result) => {
        console.log("/dashboard dbFind result:", result[0].todos);
        serveView(req, res, { todos: result[0].todos }, "/views/dashboard.handlebars");
    });
});

// General courses
app.get("/courses", (req, res) => {
    dbFind({ userID: selectedUser.userID }, "users", (result) => {
        console.log("/courses dbFind result:", result[0].courses);
        serveView(req, res, { courses: result[0].courses }, "/views/courses.handlebars");
    });
});

// Specific course
app.get("/courses/:courseID", (req, res) => {
    console.log(req.params.courseID);
    dbFind({ CRN: Number(req.params.courseID) }, "courses", (result) => {
        console.log("Got course from DB:", result);
        serveView(req, res, { courseTitle: result[0].title, description: result[0].description, participants: result[0].participants }, "/views/course.handlebars");
    });
});

// User profile
app.get("/user/:userID", (req, res) => {
    dbFind({ userID: Number(req.params.userID) }, "users", (result) => {
        console.log("Serving user profile. ID:", req.params.userID);
        console.log("result:", result);
        serveView(req, res, {
            bio: result[0].bio,
            firstName: result[0].firstName,
            lastName: result[0].lastName,
            avatarDir: result[0].avatarDir,
            courses: result[0].courses,
            contacts: result[0].contacts
        }, "/views/user.handlebars")
    });
});

// Resources
app.get("/resources", (req, res) => {
    dbFind({ userID: selectedUser.userID }, "users", (result) => {
        console.log("/resources dbFind result:", result[0].resources);
        serveView(req, res, { resources: result[0].resources }, "/views/resources.handlebars");
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
            let todo = req.body;

            todo._id = todo.CRN.toString() + todo.title.replace(" ", "");
            console.log(todo);

            db.db(dbName).collection("users").updateOne({ userID: selectedUser.userID }, { $push: { todos: req.body } });
            selectedUser.todos.push(req.body);
        } catch (e) {
            console.log(e);
        }

        db.close();
        res.redirect('/');
    });
});

/*"/todo/:todoID/:submission"*/
app.put("/submission", (req, res) => {
    let result = "";
    let file = {};

    req.on("data", (data) => {
        result += data;
    });

    req.on("end", () => {
        result = JSON.parse(result);

        // Save file to computer using fs
        fs.writeFile("./submissions" + "/" + result.name, result.file, (err) => {
            if (err) {
                console.log("Error writing file.");
                throw err;
            }

            console.log("Successfully uploaded file:", result.name);

            // Store name of submission in user's todo object
            MongoClient.connect(serverURL.concat(dbName), (err, db) => {
                if (err) {
                    console.log("Error!");
                    db.close();
                }

                try {
                    console.log("Trying to update user's todo...");
                    db.db(dbName).collection("users").updateOne(
                        { userID: selectedUser.userID, "todos._id": result._id },
                        { $push: { "todos.$.submissions": result.name } }
                    );
                } catch (e) {
                    console.log(e);
                }

                db.close();

                res.writeHead("200");
                res.end();
            });
        });
    });
});

app.delete("/todo/:titleAndCourse", (req, res) => {

});

app.put("/todo/:titleAndCourse", (req, res) => {

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

app.get("/submissions/:fileName", (req, res) => {
    serveFile(req, res);
});

// General file-fetching function
function serveFile(req, res, url) {
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
                ".png": "image/png",
                ".txt": "text/plain"
            }

            let contentType = contentTypeMap[url.match(/\.\w+$/i)];

            console.log("Served file:", url);
            res.writeHead(200, { "Content-Type": contentType });
            res.write(data);
        }
        res.end();
    });
}

// View-serving function. Interacts with data sent by client side's viewHandler.
function serveView(req, res, data, url) {
    if (!url) {
        url = req.url;
    }

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

// Socket.io stuff
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

io.on('connection', (socket) => {
    socket.on("typing", () => {
        socket.broadcast.emit("typing");
    });
});

io.on('connection', (socket) => {
    socket.on("not typing", () => {
        socket.broadcast.emit("not typing");
    });
});

http.listen(port, function () {
    console.log("Listening on port", port, "... Press CTRL+C to stop.");
});
