const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<h1>Hello Server!</h1>');
});

server.listen(8080);


server.on('listening', () => {
    console.log('Listening on port 8080');
}); 

server.on('error', (error) => {
    console.error(error);
})


