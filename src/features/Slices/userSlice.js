import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    otherUsers: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {state.user = action.payload},
        addOtherUsers: (state, action) => {state.otherUsers = action.payload},
        removeOtherUsers: (state, action) => {state.otherUsers.filter(e => e !== action.payload)},
    }
})

export const { addUser, addOtherUsers, removeOtherUsers } = userSlice.actions;
export const selectUser = (state) => state.users.user;
export const selectOtherUsers = (state) => state.users.otherUsers;
export default userSlice.reducer;