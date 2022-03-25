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


const UsersInRoom = {};
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
        displayRooms();
        user = dataObj.username;
    });

    // recieving a room message
    socket.on("roomMessage", (data) => {
        if (socket.rooms[1])
        {
            const message = JSON.parse(data);
            roomMessage[socket.rooms[1]].push(message);
        }
    })

    socket.on("tryCreateRoom", (data) => {
        const dataObj = JSON.parse(data);
        // check if can join room +++
        if (!dataObj.room) dataObj.room = Math.random().toString(36).replace(/[^a-z]+/g, '');
        socket.join(dataObj.room)
        UsersInRoom[dataObj.room] = {};
        UsersInRoom[dataObj.room].users = [];
        UsersInRoom[dataObj.room].users.push(dataObj.user);

        if (!UsersInRoom[dataObj.room].master)
        {
            UsersInRoom[dataObj.room].master = socket.id;
        }
        console.log('users in Room : ',UsersInRoom)
        // send update to all users;
        displayRooms();
    })

    socket.on("disconnect", () => {
        if (users.indexOf(user) !== -1) users.splice(users.indexOf(user),1)
        console.log(users, user)
        
        io.emit('updateOnlineUsers', users);

        // remove user
        removeUser(user);
        console.log("user disconnected");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})


const removeUser = (user) => {
    for(const [key, value] of Object.entries(UsersInRoom))
    {
        const index = value.users.indexOf(user);
        if (index !== -1)
            value.users.splice(index,1)
        if (value.users.length <= 0)
        {
            delete UsersInRoom[key];
            displayRooms();
        }
        
    }
}
const displayRooms = () => {
    io.emit('displayRooms', JSON.stringify(UsersInRoom))
};
        