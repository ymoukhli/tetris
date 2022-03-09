import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    joined: false,
    status: 'idle'
};

export const loggedSlice = createSlice({
    name: 'logged',
    initialState,
    reducers: {
        logIn: (state) => {
            state.joined = true;
        },
        logOut: (state) => {
            state.joined = false;
        }
    }
})

export const {logIn,logOut} = loggedSlice.actions;
export const selectLog = (state) => state.logged.joined;
export default loggedSlice.reducer;