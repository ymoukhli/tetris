import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    user: '',
    otherUsers: [],
    roomUsers: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addId: (state, action) => {state.id = action.payload},
        addUser: (state, action) => {state.user = action.payload},
        addOtherUsers: (state, action) => {state.otherUsers = action.payload},
        removeOtherUsers: (state, action) => {state.otherUsers.filter(e => e !== action.payload)},
        setRoomUsers: (state, action) => {
            console.log(action.payload);
            state.roomUsers = action.payload
        },
    }
})

export const { addUser, addOtherUsers, removeOtherUsers, addId,setRoomUsers } = userSlice.actions;
export const selectUser = (state) => state.users.user;
export const selectId = (state) => state.users.id;
export const selectOtherUsers = (state) => state.users.otherUsers;
export const selectUsersInRoom = (state) => state.users.roomUsers?.users;
export default userSlice.reducer;