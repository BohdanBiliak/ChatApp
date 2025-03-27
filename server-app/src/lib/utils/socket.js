import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],

    }
});

export function getReceiverSocketId(userId){
    return userCocketMap[userId]
}
const  userCocketMap = {

}
io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId ) userCocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userCocketMap));

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        delete userCocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userCocketMap));
    })
})
export {io, app, server};