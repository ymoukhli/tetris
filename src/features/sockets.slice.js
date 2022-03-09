import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,

    reducers: {
        setSocket: (state, action) => { state.value = action.payload; }
    }
})

export const { setSocket } = socketSlice.actions;
export const selectSocket = (state) => state.socket.value;
export default socketSlice.reducer;
