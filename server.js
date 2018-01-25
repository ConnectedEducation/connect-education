// ConnectEd Server

// Import the necessary Node modules.
var http = require('http');
var fs = require('fs');

// Create the server.
var myServer = http.createServer((req, res) => {

    // Generic function that sends files.
    function fetchFile(dir, callback) {
        fs.readFile(dir, (err, data) => {
            callback(data);
        });
    }

    // Puts the view and the partials together. Right now only takes into account the header and footer partials.
    function sendHTML(view) {
        let count = 0;
        let partialDir = './partials/';
        let partialFiles = ['header.html', 'footer.html'];
        let pageParts = [];

        for (i = 0; i < partialFiles.length; i++) {
            fs.readFile(partialDir + partialFiles[i], (err, data) => {
                pageParts[count] = data;
                count++;
                if (count == 2) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(pageParts[0] + view + pageParts[1]);
                    res.end();
                }
            });
        }
    }

    /*
    function sendCSS(data){

    }
    */

    // Route the requests.
    switch (req.url) {
        case '/':
            fetchFile('./views/index.html', sendHTML);
            break;
        // TEMP: This is just for testing.
        case '/ls':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            getDirItems('.', (result) => res.end(result));
            break;
        // Serve the web page.
        case '/courses':
            fetchFile('./views/courses.html', sendHTML);
            break;
        // Serve the CSS to go along with the web page. TODO: Make this more dynamic.
        case '/css/main.css':
            fs.readFile('./css/main.css', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            });
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found.');
            break;
    }

    // TEMP: Just to see how the server is reacting.
    console.log(req.url.toString());
});

// List all the items in a directory.
function getDirItems(dir, callback) {
    let body = '';
    fs.readdir(dir, (err, list) => {
        for (let i = 0; i < list.length; i++)
            body += list[i] + '\n';

        callback(body);
    });
}

// Start the server.
const port = 3000;
myServer.listen(port);
console.log("Server started (port", port.toString() + ").", "Press CTRL+C to stop...");