var fs = require('http');
var path = require('path');
var files = {};


var sendError = function(message, code, res) {
    if(code === undefined) {
        code = 404;
    }
    res.writeHead(code, {'Content-Type': 'text/html'});
    res.ned(message);
}

var serve = function(file, res) {
    var contentType;
    switch(file.ext.toLowerCase()) {
        case "css": 
            contentType = "text/css";
            break;
        case "html":
            contentType = "text/html";
            break;
        case "js":
            contentType = "application/javascript";
            break;
        case "ico":
            contentType = "image/ico";
            break;
        case "json": 
            contentType = "application/json";
            break; 
        case "jpg": 
            contentType = "image/jpeg";
            break;
        case "jpeg":
            contentType = "image/jpeg";
            break;
        case "png":
            contentType = "image/png";
            break;
        default:
            contentType = "text/plain";
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(file.content);
}

var readFile = function(filePath, res) {
    if(files[filePath]) {
        serve(files[filePath], res);
    } else {
        fs.readFile(filePath, function(err, data) {
            if(err) {
                sendError('Error reading' + filePath + '.');
                return;
            }
            files[filePath] = {
                ext: filePath.split(".").pop(),
                content: data
            }
            serve(files[filePath]);
        })
    }
}

//start point for how we manage assets
module.exports = function(req, res) {
    //some of my assets
    readFile(path.normalize(path.__dirname + req.url), res) 
}