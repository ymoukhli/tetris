import React from "react";
import styled from "styled-components";
import Message from "./Message";

const StyeldMessages = styled.div`
    overflow: scroll;
    height: 75%;
    overflow-x: hidden;
    margin-top: 1em;
`

export default function () {
    return (<StyeldMessages>
        <Message min></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
    </StyeldMessages>)
}