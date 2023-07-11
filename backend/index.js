var http = require('http');
var hostname = 'localhost';
var port = 8080;

const server = http.createServer(function(req, res){
    const url = req.url;
    const method = req.method;
    if(path === '/products'){
        if(method === 'GET'){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end([
                
            ])
        }
        else if(method === 'POST'){

        }
    }
    res.end("good bye")
});

server.listen(port, hostname);

console.log('garb market server on!');