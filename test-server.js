// TEST SERVER

var http = require('http');
var fs = require('fs');

let myServer = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Hello world!");
            break;
        case '/ls':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            getDirItems((result) => res.end(result));
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found.');
            break;
    }
});

function getDirItems(callback){
    let body = '';
    fs.readdir('.', (err, list) => {
        for(let i = 0; i < list.length; i++)
            body += list[i] + '\n';

        callback(body);
    });
}

const port = 3000;
myServer.listen(port);
console.log("Server started on port", port.toString() + '.', "Press CTRL+C to stop.");