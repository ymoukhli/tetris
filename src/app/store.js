import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loggedReducer from '../features/join/loggedSlice';
import socketReducer from '../features/sockets.slice';
import userReducer from '../features/Users/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logged: loggedReducer,
    socket: socketReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
