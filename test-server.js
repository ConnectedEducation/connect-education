// TEST SERVER

var http = require('http');
var fs = require('fs');

let myServer = http.createServer((req, res) => {
    let body = '';
    fs.readdir('.', (err, list) => {
        list.forEach((a) => {
            body += a + '\n';
            //console.log(body);
            return body;
        });
        res.end(body);
    });
});

myServer.listen(3000);