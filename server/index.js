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
    socket.on("globalMessage", (data) => {
        const message = JSON.parse(data);
        globalMessages.push(message);
        io.emit('updateGlobalMessage', JSON.stringify(globalMessages));
    });

    socket.on("joinOrEditUser", (dataString) => {
        const data = JSON.parse(dataString)
        // check if username and room are valid
        if(!data || !data.user)
        {
            const matche =  data.user.trim().match(/^\w+/)?.[0];
            if ((matche && matche.length !== dataObj.username.trim().length) || !matche)
                return;
        }

        if (Boolean(users.find(e => e.id === data.id)))
        {
            // edit user
            resetUser(data);
        }
        else
        {
            // add user and emit update ui with emited events
            users.push(data);
            socket.emit('joined');
            io.emit('updateOnlineUsers', JSON.stringify(users.map(e => e.user)))
            io.emit('updateGlobalMessage', JSON.stringify(globalMessages));
            displayRooms();
            user = data.user;
        }
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
            socket.emit('roomJoined');
            displayRooms(room);
            displayRoomMessage(room);
        }
    })
    socket.on("tryCreateRoom", (data) => {

        const dataObj = JSON.parse(data);
        // check if can join room +++
        if (!dataObj.room) return;
        
        socket.join(dataObj.room);
        removeUser(dataObj.user ,socket, room);
        room = dataObj.room;
        initRoom(room,UsersInRoom)

        UsersInRoom[room].users.push(dataObj.user);
        UsersInRoom[room].ids.push(socket.id);
        if (!UsersInRoom[room].master)
        {
            UsersInRoom[room].master = socket.id;
        }
        
        // send update to all users;
        displayRoomMessage(room);
        displayRooms(room);
        socket.emit('roomJoined');
    })
    socket.on('leaveRoom', (dataString) => {
        const data = JSON.parse(dataString);
        removeUser(user, socket, room);
        socket.emit('removedFromRoom')
    })
    socket.on("disconnect", () => {
        if (users.indexOf(user) !== -1)
            users.splice(users.indexOf(user),1);
        
        io.emit('updateOnlineUsers', users);
        // remove user
        removeUser(user, socket, room);
        console.log("user disconnected");
    })
})
server.listen(4000, () => {
    console.log('listening on port 4000');
})

const removeUser = (user, socket, room) => {
    if (!room || !UsersInRoom[room]) return;
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
        }
        // replace room master if needed
        else
        {
            if (socket.id === value.master)
            {
                value.master = value.ids[0];
            }
        }
        displayRooms(room);
    }
    room = '';
}

const displayRooms = (room) => {
    // send data for rooms componant
    io.emit('displayRooms', JSON.stringify(UsersInRoom));
    // send data for userRoom componant
    if(room && UsersInRoom[room])
    {
        io.to(room).emit(   
            'displayRoomUsers',
            JSON.stringify({
                users: UsersInRoom[room].users.map(e => e.user),
                master: UsersInRoom[room].master
            }));
    }
};

const displayRoomMessage = (room) => {
    if (!roomMessage[room]) roomMessage[room] = [];
    io.to(room).emit('updateRoomMessage', JSON.stringify(roomMessage[room]));
}

function initRoom(room,UsersInRoom) {
    
    UsersInRoom[room] = {};
    UsersInRoom[room].users = [];
    UsersInRoom[room].ids = [];
}

function resetUser(data)
{
    const element = users.find(e = e.id === data.id);
    if (element) element.user = data.user;
    globalMessages.find(e => e.id === data.id).map(e => e.username = data.user);
    for (const [key,value] of Object.entries(roomMessage))
    {
        if (Boolean(value.find(e => e.id === data.id)))
        {
            value.filter(e => e.id === data.id).map(e => e.username = data.user);
            break;
        }
    }

    // add reset for room names
}

