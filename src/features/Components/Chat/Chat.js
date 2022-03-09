import React from "react";
import styled from "styled-components";
import Title from "../Title";
import Switchs from "../Switchs"
import Messages from "./Messages";
import InputMessage from "./InputMessage";

const StyledChat = styled.div`
    background-color: white;
    padding: 1em;
    height: 100vh;
`

export default function () {
    return (
    <StyledChat>
        <Title text="Chat"></Title>
        <Switchs></Switchs>
        <Messages></Messages>
        <InputMessage></InputMessage>
    </StyledChat>
    )
}