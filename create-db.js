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
        todos: [
            {
                CRN: 1,
                title: "Assignment 1",
                description: "Actually do the assignment.",
                dueDate: "4/20/2018", // Convert to actual date...
                color: "blue",
                submissions: []
            },
            {
                CRN: 2,
                title: "Assignment 2",
                description: "Actually do the assignment.",
                dueDate: "4/20/2018", // Convert to actual date...
                color: "yellow",
                submissions: []
            },
            {
                CRN: 3,
                title: "Assignment 3",
                description: "Actually do the dance.",
                dueDate: "4/20/2020", // Convert to actual date...
                color: "pink",
                submissions: []
            }
        ],
        courses: [1],
        contacts: []
    }
];


let courses = [
    {
        CRN: 1, /* Use _id instead */
        title: "English",
        description: "description",
        participants: [0],
    },
    {
        CRN: 2,
        title: "Spanish",
        description: "Esto es el fin, Grande Padre!",
        participants: [0]
    }
];

/*
let todos = [
    {
        todoID: 1,
        CRN: 1,
        title: "Assignment 1",
        description: "Actually do the assignment.",
        dueDate: "4/20/2018", // Convert to actual date...
        color: "blue"
    },
    {
        todoID: 2,
        CRN: 1,
        title: "Assignment 2",
        description: "Actually do the assignment.",
        dueDate: "4/20/2018", // Convert to actual date...
        color: "yellow"
    },
    {
        todoID: 3,
        CRN: 3,
        title: "Assignment 3",
        description: "Actually do the dance.",
        dueDate: "4/20/2020", // Convert to actual date...
        color: "pink"
    }
];*/

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

    // Try insert many or just insert new todo manually
    /*connectEd.collection("todos").insertMany(todos, (err, result) => {
        console.log("Inserted todo:" + JSON.stringify(todos[0]));
        db.close();
    });*/
});