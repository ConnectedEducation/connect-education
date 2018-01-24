// ConnectEd Server

// Import the necessary Node modules.
var http = require('http');
var fs = require('fs');

// Create the server.
var myServer = http.createServer((req, res) => {

    // Route the requests.
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Hello world!");
            break;
        // TEMP: This is just for testing.
        case '/ls':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            getDirItems('.', (result) => res.end(result));
            break;
        // Serve the web page. TODO: Make this more dynamic.
        case '/courses':
            fs.readFile('./courses.html', (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
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
console.log("Server started on port", port.toString() + '.', "Press CTRL+C to stop.");