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
const roomMessage = {};
// holde all connected users;
const users = [];

io.on('connection', (socket) => {
    let user = '';
    let room = '';
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
        if (room)
        {
            const message = JSON.parse(data);
            roomMessage[room].push(message);
            io.to(room).emit('updateRoomMessage', JSON.stringify(roomMessage[room]))
        }
    })

    socket.on('joinRoom', (data) => {
        const myRoom = JSON.parse(data)
        removeUser(user, socket, room);
        room = myRoom.room;
        if (UsersInRoom[room])
        {
            UsersInRoom[room].users.push(user);
            UsersInRoom[room].ids.push(socket.id);
            socket.join(room);
            displayRooms(room);
            socket.emit('roomJoined');
            displayRoomMessage(room);
        }
    })
    socket.on("tryCreateRoom", (data) => {
        const dataObj = JSON.parse(data);
        // check if can join room +++
        if (!dataObj.room)
            dataObj.room = Math.random().toString(36).replace(/[^a-z]+/g, '');

        socket.join(dataObj.room);
        removeUser(dataObj.user ,socket, room);
        room = dataObj.room;
        UsersInRoom[room] = {};
        UsersInRoom[room].users = [];
        UsersInRoom[room].ids = [];

        displayRoomMessage(room)
        UsersInRoom[room].users.push(dataObj.user);
        UsersInRoom[room].ids.push(socket.id);
        
        if (!UsersInRoom[room].master)
        {
            UsersInRoom[room].master = socket.id;
        }
        // send update to all users;
        displayRooms(room);
        socket.emit('roomJoined') //
    })

    socket.on("disconnect", () => {
        if (users.indexOf(user) !== -1)
            users.splice(users.indexOf(user),1);
        
        io.emit('updateOnlineUsers', users);
        // remove user
        removeUser(user, socket, room);
        displayRooms(room);
        console.log("user disconnected");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})

const removeUser = (user, socket, room) => {
    if (!room) return;
    const value = UsersInRoom[room];
    const index = value.users.indexOf(user);
    if (index !== -1)
    {
        const idIndex = value.ids.indexOf(socket.id);
        
        // clear user from local data;
        value.users.splice(index,1);
        if (idIndex >= 0) value.ids.splice(idIndex, 1); 
        socket.leave(room);
        if (value.users.length <= 0)
        {
            delete UsersInRoom[room];
            displayRooms(room);
        }
        // replace room master if needed
        else
        {
            if (socket.id === value.master)
            {
                value.master = value.ids[0];
            }
        }
    }
    room = '';
}

const displayRooms = (room) => {
    io.emit('displayRooms', JSON.stringify(UsersInRoom));
    console.log('display rooms ' + room)
    if(room && UsersInRoom[room])
    {
        io.to(room).emit(   
            'displayRoomUsers',
            JSON.stringify({
                users: UsersInRoom[room].users,
                master: UsersInRoom[room].master
            }));
        console.log(`emitting users ${UsersInRoom[room]}`);
    }
};

const displayRoomMessage = (room) => {
    if (!roomMessage[room]) roomMessage[room] = [];
    io.to(room).emit('updateRoomMessage', JSON.stringify(roomMessage[room]));
}
        