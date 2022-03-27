import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    rooms : {},
    inRoom: false,
}

const RoomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateRooms: (state, action) => {state.rooms = action.payload},
        setRoom: (state, action) => {state.inRoom = action.payload}
    }
})

export const selectRooms = (state) => state.rooms.rooms;
export const selectIsInRoom = (state) => state.rooms.inRoom;
export const { updateRooms, setRoom } = RoomSlice.actions;
export default RoomSlice.reducer;