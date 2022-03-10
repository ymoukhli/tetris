import { connectSocket,connectingSocket } from "./sockets.slice"
import { io } from "socket.io-client";
import { addOtherUsers, addUser } from "./Slices/userSlice";
import { logIn } from "./join/loggedSlice";
import { updateGlobalMessages, updateRoomMessages } from "./Slices/MessageSlice";

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
        }
        if (action.type === 'message')
        {
            console.log(action)
            socket.emit('globalMessage', JSON.stringify(action.payload));
        }
        if (addUser.match(action))
        {
            socket.emit('join', JSON.stringify({username: action.payload}));
        }
        next(action);
    }
}