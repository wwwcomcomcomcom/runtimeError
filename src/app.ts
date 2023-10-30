import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import cors from  'cors';

import socket from 'socket.io';

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, '..', 'svelte', 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..','svelte', 'public', 'index.html'));
    // fs.readFile("./svelte/public/index.html", function (err,data){
    //     if(err) {
    //         res.send(err);
    //         throw err;
    //     }else{
    //         res.writeHead(200, { 'Content-Type': 'text/html'});
    //         res.write(data);
    //         res.end();
    //     }
    // });
});

app.get('/get/question', function (req, res) {
    //url params
    // console.log(req.query)
    res.json({this:'is a Question'});
    res.end();
});

io.sockets.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
    socket.on("submit",(value)=>{
        io.sockets.emit("addQuestion",value);
    });
    console.log("New client connected");
});