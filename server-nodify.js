// ConnectEd Server

// Import the necessary Node modules.
var http = require('http');
var fs = require('fs');

// Create the server.
var myServer = http.createServer((req, res) => {

    // Generic function that sends files.
    function fetchFile(dir) {
        // Check file extension.
        if (dir.match(/.html$/)) {
            fs.readFile(dir, (err, data) => {
                sendPage(data.toString());
            });
        } else if (dir.match(/.css$/)) {
            fs.readFile(dir, (err, data) => {
                sendFile(data.toString(), 'text/css');
            });
        } else if (dir.match(/.js$/)) {
            fs.readFile(dir, (err, data) => {
                sendFile(data.toString(), 'text/javascript');
            });
        }
    }

    // Sends requested HTML files.
    function sendPage(view) {
        let count = 0;
        let partialDir = './partials/';
        let partialFiles = ['header.html', 'footer.html'];
        let pageParts = [];
        let result = '';
        let matched = {};

        // Puts the view and the partials together. Right now only takes into account the header and footer partials.
        function makePage(i) {
            fs.readFile(partialDir + partialFiles[i], (err, data) => {
                pageParts[i] = data.toString();
                count++;
                if (count == 2) {
                    result = pageParts[0] + view + pageParts[1];

                    // TODO: Expand on this idea.
                    let customList = result.match(/{{.*}}/g);
                    if(customList.length > 1){
                        for(let j = 0; j < customList.length; j++){
                            matched[customList[j]] = '';
                        }
                    }
                    // replace('thing to replace', callback){}
                    console.log(customList);
                    console.log(matched);

                    result = result.replace(/{{title}}/, 'REPLACED');

                    // build list of {{}} stuff to replace
                    // go through the list and replace

                    sendFile(result, 'text.html');
                }
            });
        }

        for (i = 0; i < partialFiles.length; i++) {
            makePage(i);
        }
    }

    function sendFile(data, type) {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        res.end();
    }

    // Route the requests.
    switch (req.url) {
        case '/':
            fetchFile('./views/index.html');
            break;

        // TEMP: This is just for testing.
        case '/ls':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            getDirItems('.', sendPage);
            break;

        // Serve the web page.
        case '/courses':
            fetchFile('./views/courses.html');
            break;

        // Serve the CSS to go along with the web page. TODO: Make this more dynamic.
        case '/css/main.css':
            fetchFile('./css/main.css');
            break;

        case '/js/chat.js':
            fetchFile('./js/chat.js');
            break;

        case '/css/chat.css':
            fetchFile('./css/chat.css');
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
    let body = '<ul>';
    fs.readdir(dir, (err, list) => {
        for (let i = 0; i < list.length; i++) {
            body += '<li>' + list[i] + '</li>';
        }

        body += '</ul>';
        callback(body);
    });
}

// Start the server.
const port = 3000;
myServer.listen(port);
console.log("Server started (port", port.toString() + ").", "Press CTRL+C to stop...");