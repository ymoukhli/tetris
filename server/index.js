const express = require('express');
const app = express();
const http = require('http');
const { stringify } = require('querystring');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


const UsersInRoom = [];
// holdes all messages in a lobby
const messages = [];
// holdes room messages
const roomMessage = [];
// holde all connected users;
const users = [];

io.on('connection', (socket) => {
    console.log("user connected " + socket.id);
    // send all messages to a user
    socket.emit("displayLobbyMessages", JSON.stringify(messages));
    // send list of all connected users
    socket.emit("displayConnectedUsers", JSON.stringify(users));

    // recieving a lobby message
    socket.on("lobbyMessage", (data) => {
        const message = JSON.parse(data);
        messages.push(message);
    })

    socket.on("join", (data) => {
        const dataObj = JSON.parse(data)
        if(!dataObj || !dataObj.username) return;
        // check if username and room are valid
        if (dataObj.username.trim().match(/^\w+/)[0].length === dataObj.username.trim().length)
        {
            users.push(dataObj.username);
            io.emit('joined');
        }
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

    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})