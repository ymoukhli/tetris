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
const globalMessages = [];
// holdes room messages
const roomMessage = [];
// holde all connected users;
const users = [];

io.on('connection', (socket) => {
    let user = ''
    console.log("user connected " + socket.id);
    // send all messages to a user
    // send list of all connected users

    // recieving a lobby message
    socket.on("globalMessage", (data) => {
        const message = JSON.parse(data);
        globalMessages.push(message);
        io.emit('updateGlobalMessage', JSON.stringify(globalMessages));
    });

    socket.on("join", (data) => {
        const dataObj = JSON.parse(data)
        console.log(dataObj, 'joined')
        // check if username and room are valid
        if(!dataObj || !dataObj.username ||
        dataObj.username.trim().match(/^\w+/)[0].length !== dataObj.username.trim().length) return;
        if (users.indexOf(dataObj.username) !== -1) return;
        users.push(dataObj.username);
        socket.emit('joined');
        io.emit('updateOnlineUsers', users);
        socket.emit('updateGlobalMessage',  JSON.stringify(globalMessages));
        user = dataObj.username;
    });

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
        users.splice(users.indexOf(user),1)
        console.log(users, user)
        io.emit('updateOnlineUsers', users);
        console.log("user disconnected");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})