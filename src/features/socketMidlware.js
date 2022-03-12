import { connectSocket,connectingSocket } from "./sockets.slice"
import { io } from "socket.io-client";
import { addOtherUsers, addUser,addId } from "./Slices/userSlice";
import { logIn } from "./join/loggedSlice";
import { updateGlobalMessages, updateRoomMessages } from "./Slices/MessageSlice";
import { updateRooms } from "./Slices/RoomSlice";

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
            socket.on('updateOnlineUsers', (users) => {
                store.dispatch(addOtherUsers(users))
            })

            socket.on('updateGlobalMessage', (messages) => {
                const data = JSON.parse(messages)
                store.dispatch(updateGlobalMessages(data))
            })
            
            socket.on('updateRoomlMessage', (messages) => {
                store.dispatch(updateRoomMessages(messages))
            })

            socket.on('updateRooms', (rooms) => {
                const data = JSON.parse(rooms)
                store.dispatch(updateRooms(data))
            })
        }
        if (action.type === 'message')
        {
            console.log(action)
            action.payload.id = socket.id;
            socket.emit('globalMessage', JSON.stringify(action.payload));
        }
        if (action.type === 'createRoom')
        {
            socket.emit('tryCreateRoom', JSON.stringify({...action.payload, id : socket.id}))
        }
        if (addUser.match(action))
        {
            store.dispatch(addId(socket.id))
            socket.emit('join', JSON.stringify({username: action.payload}));
        }
        next(action);
    }
}