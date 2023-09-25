import express, { response } from 'express';
import * as http from 'http';
import * as fs from 'fs';
import socket from 'socket.io';

const port = 8080;

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

app.get('/', function (req, res) {
    fs.readFile("./static/index.html", function (err,data){
        if(err) {
            res.send(err);
            throw err;
        }else{
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});

io.sockets.on('connection', ()=>{
    console.log("tset");
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});