// var http = require('http');

// var fs = require('fs');
// http.createServer(function(req, res) {
//     var content = '';
//     var type = '';
//     if(req.url === '/') {
//         content = fs.readFileSync('./page.html')
//         type = 'text/html';
//     } else if (req.url === '/styles.css') {
//         content = fs.readFileSync('./styles.css');
//         type = 'text/css';
//     } else if (req.url === '/api/user/new') {
//         //reading POST parameters
//         // storing the user into the database
//         content = '{"success": true}';
//         type = 'application/json';
//     }
//     res.writeHead(200, {'Content-Type': type})
//     res.end(content + '\n');

// }).listen(1337, '127.0.01');

//var url = require('url');
//var qs = require('querystring');
/**
var processRequest = function(req, callback) {
    var body = '';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
        //callback(qs.parse(body));
        const params = new URLSearchParams(body)
        callback(params.toString());
    });
}
//simple rest api
var controller = function(req, res) {
    var message = '';
    switch(req.method){
        case 'GET':
            message = "That's GET message";
            break;
        case 'POST':
            message = "That's POST message";
            break;
        case 'PUT':
            processRequest(req, function(data) {
                message = "That's PUT message. You are editing " + 
                data.book + " book.";
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(message + "\n");
            });
            return;
        case 'DELETE':
            message = "That's DELETE message";
            break;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message + '\n');
}



http.createServer(controller).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');
*/

//var app = http.createServer(assets).listen(port, host);
var http = require('http');
var Assets = require('./backend/Assets');
const port = 9000;
const host = '127.0.0.1';


http.createServer(Assets).listen(port, host);
console.log("Listening on " + host + ":" + port);
