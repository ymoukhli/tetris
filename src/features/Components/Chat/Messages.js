import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectGlobalMessages } from "../../Slices/MessageSlice";
import { selectId } from "../../Slices/userSlice";
import Message from "./Message";

const StyeldMessages = styled.div`
    overflow: scroll;
    height: 75%;
    overflow-x: hidden;
    margin-top: 1em;
`

export default function () {
    const globalMessagesState = useSelector(selectGlobalMessages);
    const id = useSelector(selectId);
    const globalMessages = globalMessagesState.map((e, i) => {console.log(id, e.id.length); return <Message key={i} text={e.text} username={e.username} min={(id === e.id).toString()}></Message>})
    return (<StyeldMessages>
        {globalMessages}
    </StyeldMessages>)
}