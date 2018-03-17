// Create the db

var MongoClient = require('mongodb').MongoClient;
let serverUrl = "mongodb://localhost:27017/";
let dbName = "connected";


let users = [
    {
        userID: 0,
        firstName: "Jim",
        lastName: "Styles",
        userName: "JimStyles",
        avatarDir: "/user/0/media/test.jpg",
        bio: "I'm a really cool guy!",
        todos: [1],
        courses: [1],
        contacts: []
    }
];


let courses = [
    {
        CRN: 1,
        title: "English",
        description: "description",
        participants: ["person1", "person2"],
    }
];

let todos = [
    {
        todoID: 1,
        CRN: 1,
        title: "Assignment 1",
        description: "Actually do the assignment.",
        dueDate: "4/20/2018" // Convert to actual date...
    }
];

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

    connectEd.collection("courses").insertOne(courses[0], (err, result) => {
        console.log("Inserted course:" + JSON.stringify(courses[0]));
        db.close();
    });

    connectEd.collection("todos").insertOne(todos[0], (err, result) => {
        console.log("Inserted todo:" + JSON.stringify(todos[0]));
        db.close();
    });
});