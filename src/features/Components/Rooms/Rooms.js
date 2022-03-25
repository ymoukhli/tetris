import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRooms } from "../../Slices/RoomSlice";
import Button from "../Button";
import Seperator from "../Seperator";
import Title from "../Title";
import Room from "./Room";
import RoomInput from './RoomInput';

const StyledRooms = styled.div`
background-color: white;
display:flex;
flex-direction: column;
padding: 1em;
`
const StyledRoomInput = styled.div`

`
export default function() {
    // add creat room
    const [RoomInputs, setRoomInput] = useState(false);
    const rooms = useSelector(selectRooms);
    let jsxRooms=[];
    const handleClick = (e) => {
        e.preventDefault();
        setRoomInput(true);
    };

    jsxRooms = Object.keys(rooms).map((e, i) => 
    <Room 
        key={i} 
        name={e} 
        master={rooms[e].master}
        users={rooms[e].users}
    ></Room>)
    return (<StyledRooms>
        {RoomInputs && <RoomInput setRoomInput={setRoomInput}></RoomInput>}
            <Button onClick={handleClick} text="Creat New Room"></Button>
            <Seperator></Seperator>
            <Title text="Rooms"></Title>
        {jsxRooms}
    </StyledRooms>)
}