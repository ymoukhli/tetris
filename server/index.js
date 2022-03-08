const express = require('express');
const app = express();
const http = require('http');
const { stringify } = require('querystring');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);


const UsersInRoom = [];
// holdes all messages in a lobby
const messages = [];
// holdes room messages
const roomMessage = [];
// holde all connected users;
const users = [];

io.on('connection', (socket) => {
    // send all messages to a user
    socket.emit("displayLobbyMessages", JSON.stringify(messages));
    // send list of all connected users
    socket.emit("displayConnectedUsers", JSON.stringify(users));

    // recieving a lobby message
    socket.on("lobbyMessage", (data) => {
        const message = JSON.parse(data);
        messages.push(message);
    })

    // recieving a room message
    socket.on("roomMessage", (data) => {
        if (socket.rooms[1])
        {
            const message = Json.parse(data);
            roomMessage[socket.rooms[1]].push(message);
        }
    })

    socket.on("joinRoom", (data) => {
        const dataObj = JSON.parse(data);
        // check if can join room +++

        socket.join(dataObj.room);
        UsersInRoom[dataObj.room].users.push(data.user);
        if (!UsersInRoom[dataObj.room].master)
        {
            UsersInRoom[dataObj.room].master = data.user;
        }

        // send update to all users;
        io.to(socket.rooms[1]).emit("displayRoomUsers", () => UsersInRoom[socket.rooms[1]]);
        // send message update to connected user
        socket.emit("displayRoomMessages", () => JSON.stringify(roomMessage[socket.rooms[1]]));
    })

    socket.on("", () => {
        console.log("empty event");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})