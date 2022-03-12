import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loggedReducer from '../features/join/loggedSlice';
import { socketMidlware } from '../features/socketMidlware';
import socketReducer from '../features/sockets.slice';
import userReducer from '../features/Slices/userSlice';
import messageReducer from '../features/Slices/MessageSlice';
import roomReducer from '../features/Slices/RoomSlice'
import thunk from 'redux-thunk'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logged: loggedReducer,
    socket: socketReducer,
    users: userReducer,
    messages: messageReducer,
    rooms: roomReducer,
  },
  middleware: [socketMidlware,thunk],
  })
