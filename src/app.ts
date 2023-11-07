import express from "express";
import http from "http";
import path from "path";
// import cors from  'cors';

import socket from "socket.io";
import * as QuestionDB from "./questions";
import QuestionObject, { randomString } from "./utils";

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, "..", "svelte", "public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "svelte", "public", "index.html"));
});


app.get("/get/question", function (req, res) {
    //url params
    // console.log(req.query)
    res.json({ this: "is a Question" });
    res.end();
});

function addQuestion(quesetion: QuestionObject) {
    io.sockets.emit("addQuestion", quesetion);
    QuestionDB.addQuestion(quesetion);
}

function removeAllQuestion(){
    io.sockets.emit("removeAllQuestion");
    QuestionDB.removeAllQuestions();
}

io.sockets.on("connection", (socket) => {

    console.log("\nNew client connected");

    //for debugging
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    /**db에 미리 있던 질문생성 */
    if (QuestionDB.data.length !== 0) {
        QuestionDB.data.forEach((question) => {
            socket.emit("addQuestion", question);
        });
    }

    /**get uuid for auto login */
    socket.once("handshake", (uuid)=>{
        console.log(uuid);
    });
    /**get add question requestion */
    socket.on("addQuestion", (value) => {
        value.id = randomString(5);
        addQuestion(value);
    });
    socket.on("removeAllQuestion",()=>{
        removeAllQuestion();
    });
    
});
