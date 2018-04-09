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
        contacts: [1, 2]
    },
    {
        userID: 1,
        firstName: "Fran",
        lastName: "Ericsson",
        userName: "FranClan",
        avatarDir: "/user/1/media/kon-yui.jpg",
        bio: "It's me, Fran.",
        todos: [],
        courses: [1, 2],
        contacts: [0]
    },
    {
        userID: 2,
        firstName: "Fblthp",
        lastName: "Fibblestein",
        userName: "Fibble",
        avatarDir: "/user/2/media/fblthp1.png",
        bio: "I've always hated crowds!",
        todos: [],
        courses: [2],
        contacts: [0]
    }
];

for (let i = 0; i < users[0].todos.length; i++) {
    let todo = users[0].todos[i];
    todo._id = todo.CRN.toString() + todo.title.replace(" ", "");
}


let courses = [
    {
        CRN: 1,
        title: "English",
        description: "description",
        participants: [0, 2],
    },
    {
        CRN: 2,
        title: "Spanish",
        description: "Esto es el fin, Grande Padre!",
        participants: [0, 1]
    }
];

// A bit (LOT) of a hackjob:
// TODO: Denormalize data when creating db...
// lmao, modularize this nonsense
function fakeJoin () {
    // Join users with courses
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].courses.length; j++){
            let target = users[i].courses[j];
            for(let k = 0; k < courses.length; k++){
                if(courses[k].CRN == target){
                    users[i].courses[j] = courses[k];
                }
            }
        }
    }

    // Join users with contacts
    function Contact(user){
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.courses = user.courses;
    }

    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].contacts.length; j++){
            let target = users[i].contacts[j];
            for(let k = 0; k < users.length; k++){
                if(users[k].userID == target){
                    users[i].contacts[j] = new Contact(users[k]);
                }
            }
        }
    }

    // Join courses and participants
    function Participant(user){
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    for(let i = 0; i < courses.length; i++){
        for(let j = 0; j < courses[i].participants.length; j++){
            let target = courses[i].participants[j];
            for(let k = 0; k < users.length; k++){
                if(users[k].userID == target){
                    courses[i].participants[j] = new Participant(users[k]);
                }
            }
        }
    }

    // Join todos and courses
    function Course(course) {
        this.CRN = course.CRN;
        this.title = course.title;
    }

    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users[i].todos.length; j++){
            let target = users[i].todos[j].CRN;
            for(let k = 0; k < courses.length; k++){
                if(courses[k].CRN == target){
                    // Super hackjob: CRN contains full course. Change in future.
                    users[i].todos[j].CRN = new Course(courses[k]);
                }
            }
        }
    }
}

fakeJoin();

MongoClient.connect(serverUrl.concat(dbName), (err, db) => {
    if (err) {
        console.log("Error!");
        db.close();
    }

    console.log("Connected to database!");

    let connectEd = db.db("connected");

    for (let i = 0; i < users.length; i++) {
        connectEd.collection("users").insertOne(users[i], (err, result) => {
            console.log("Inserted user:" + JSON.stringify(users[i]));
            db.close();
        });
    }

    for (let i = 0; i < courses.length; i++) {
        connectEd.collection("courses").insertOne(courses[i], (err, result) => {
            console.log("Inserted course:" + JSON.stringify(courses[i]));
            db.close();
        });
    }
});