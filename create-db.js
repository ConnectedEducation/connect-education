// Create the db

var MongoClient = require('mongodb').MongoClient;
let serverUrl = "mongodb://localhost:27017/";
let dbName = "connected";


let users = [{
    userID: 0,
    firstName: "Jim",
    lastName: "Styles",
    userName: "JimStyles",
    avatarDir: "/user/0/media/test.jpg",
    todos: [{ color: "#FF8A80", title: "Assignment 1", course: "INFO 4105", dueDate: "2/12/2018", description: "Lorem ipsum." },
    { color: "#FFD180", title: "Reading 1", course: "INFO 4200", dueDate: "2/14/2018", description: "Read this please." },
    { color: "#FFFF8D", title: "Project", course: "INFO 4300", dueDate: "3/20/2018", description: "Big project." },
    { color: "#CFD8DC", title: "Assignment 1", course: "INFO 4400", dueDate: "4/12/2018", description: "Florem blipsum." }],
    courses: [{ title: "INFO 4105", description: "Hello!" },
    { title: "INFO 4200", description: "Hello!" },
    { title: "INFO 4300", description: "Hello!" },
    { title: "INFO 4400", description: "Hello!" }],
    bio: "I'm a really cool guy!"
}];

MongoClient.connect(serverUrl.concat(dbName), (err, db) => {
    if (err) {
        console.log("Error!");
        db.close();
    }

    console.log("Connected to database!");

    let connectEd = db.db("connected");

    connectEd.collection("users").insertOne(users[0], (err, result) => {
        console.log("Inserted user:" + JSON.stringify(users[0]));
        db.close();
    });
});