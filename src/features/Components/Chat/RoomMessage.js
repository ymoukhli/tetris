import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectGlobalMessages, selectRoomlMessages } from "../../Slices/MessageSlice";
import { selectId } from "../../Slices/userSlice";
import Message from "./Message";

const StyeldMessages = styled.div`
    overflow: scroll;
    height: 75%;
    overflow-x: hidden;
    margin-top: 1em;
`

export default function () {
    const roomMessagesState = useSelector(selectRoomlMessages);
    const id = useSelector(selectId);
    const roomMessages = roomMessagesState.map((e, i) =>
    <Message key={i} text={e.text} username={e.username} min={(id === e.id).toString()}/>)
    
    return (
    <StyeldMessages>
        {roomMessages}
    </StyeldMessages>
    )
}