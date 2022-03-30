import React, { useState } from "react";
import styled from "styled-components";
import Title from "../Title";
import Switchs from "../Switchs"
import GlobalMessages from "./GlobalMessages";
import RoomMessages from './RoomMessage.js'
import InputMessage from "./InputMessage";
import { useSelector } from "react-redux";
import { selectIsInRoom } from "../../Slices/RoomSlice";
import { useEffect } from "react";
const StyledChat = styled.div`
    background-color: white;
    padding: 1em;
    height: 100vh;

    div:first-child {
        text-align: center;
    }
`

export default function () {

    const inRoom = useSelector(selectIsInRoom)
    const [toGlobalChat, setToGlobalChat] = useState(true);
    function handleRoomClick() {
        if (inRoom)
        {
            setToGlobalChat(false);
        }
    }
    function handleGlobalClick() {
        setToGlobalChat(true);
    }

    useEffect(() => {
        setToGlobalChat(true);
    }, [inRoom]);

    return (
    <StyledChat>
        <Title text="Chat"></Title>
        {/* <Switchs></Switchs> */}
        <div>
            <button onClick={handleGlobalClick}>global</button>
            <button onClick={handleRoomClick}>room</button>
        </div>
        {toGlobalChat && <GlobalMessages/>}
        {!toGlobalChat && <RoomMessages/>}
        <InputMessage type={toGlobalChat?"global": "room"}></InputMessage>
    </StyledChat>
    )
}