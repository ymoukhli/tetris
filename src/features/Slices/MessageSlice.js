import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    roomMessages: [],
    globalMessages: [],
}

const MessagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        updateGlobalMessages: (state, action) => {state.globalMessages = action.payload},
        updateRoomMessages: (state, action) => {state.roomMessages = action.payload}
    }
})

export const selectGlobalMessages = (state) => state.messages.globalMessages;
export const selectRoomlMessages = (state) => state.messages.roomMessages;

export const {updateGlobalMessages, updateRoomMessages} = MessagesSlice.actions;
export default MessagesSlice.reducer;