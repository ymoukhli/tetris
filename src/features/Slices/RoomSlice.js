import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    rooms : {},
}

const RoomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateRooms: (state, action) => {state.rooms = action.payload}
    }
})

export const selectRooms = (state) => state.rooms.rooms;
export const { updateRooms } = RoomSlice.actions;
export default RoomSlice.reducer;