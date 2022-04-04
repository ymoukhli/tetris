import { connectSocket,connectingSocket } from "./sockets.slice"
import { io } from "socket.io-client";
import { addOtherUsers, addUser,addId,setRoomUsers } from "./Slices/userSlice";
import { logIn } from "./Slices/loggedSlice";
import { updateGlobalMessages, updateRoomMessages } from "./Slices/MessageSlice";
import { updateRooms,setRoom } from "./Slices/RoomSlice";

export const socketMidlware = (store) => {
    let socket;
    return next => action => {
        if (connectingSocket.match(action))
        {
            socket = io('http://localhost:4000');
            socket.on('connect', () => {
                store.dispatch(connectSocket())
                console.log("socket connected")
            })
            socket.on('joined', () => {
                store.dispatch(logIn())
            })
            socket.on('updateOnlineUsers', (dataString) => {
                const data = JSON.stringify(dataString);
                store.dispatch(addOtherUsers(data))
            })

            socket.on('updateGlobalMessage', (messages) => {
                const data = JSON.parse(messages)
                store.dispatch(updateGlobalMessages(data))
            })
            
            socket.on('updateRoomMessage', (messages) => {
                const data = JSON.parse(messages)
                console.log(data)
                store.dispatch(updateRoomMessages(data))
            })
            socket.on('displayRooms', (dataString) => {
                console.log(socket)
                const data = JSON.parse(dataString);
                store.dispatch(updateRooms(data))
            })
            socket.on('roomJoined', (dataString) => {
                store.dispatch(setRoom(true));
            })
            socket.on('removedFromRoom', () =>
            {
                store.dispatch(setRoom(false));
            })
            socket.on('displayRoomUsers', (dataString) => {
                const data = JSON.parse(dataString);
                store.dispatch(setRoomUsers(data));
            })
        }
        if (action.type === 'global')
        {
            action.payload.id = socket.id;
            socket.emit('globalMessage', JSON.stringify(action.payload));
        }
        if (action.type === 'room')
        {
            action.payload.id = socket.id;
            socket.emit('roomMessage', JSON.stringify(action.payload));
        }
        if (action.type === 'creatRoom')
        {
            socket.emit('tryCreateRoom', JSON.stringify({...action.payload, id : socket.id, user: store.getState().users.user}))
        }
        if (action.type === 'joinRoom')
        {
            socket.emit('joinRoom', JSON.stringify({room: action.payload}))
        }
        if (action.type === 'leaveRoom')
        {
            socket.emit('leaveRoom', JSON.stringify(action.payload))
        }
        if (addUser.match(action))
        {
            store.dispatch(addId(socket.id));
            socket.emit('joinOrEditUser', JSON.stringify({user: action.payload, id: socket.id}));
        }
        next(action);
    }
}