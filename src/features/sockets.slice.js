import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false,
    connecting: false,
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,

    reducers: {
        connectingSocket: (state) => { state.connecting = true; },
        connectSocket: (state) => { state.connected = true; }
    }
})

export const { connectSocket,connectingSocket } = socketSlice.actions;
export const selectSocket = (state) => state.socket.connected;
export default socketSlice.reducer;
