import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    otherUsers: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => state.user = action.payload,
        addOtherUsers: (state, action) => state.otherUsers.push(action.payload),
        removeOtherUsers: (state, action) => state.otherUsers.filter(e => e !== action.payload),
    }
})

export const {addUser, addOtherUsers, removeOtherUsers} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectOtherUsers = (state) => state.user.otherUsers;
export default userSlice.reducer;