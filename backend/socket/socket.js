import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"],
        credentials:true,
    }
});



io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on("send_message", (message) => {
        console.log("New message:", message);
        io.to(message.receiverId).emit("receive_message", message); // Send only to receiver
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
})



export {app, io, server}