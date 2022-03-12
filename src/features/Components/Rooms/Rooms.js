import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Seperator from "../Seperator";
import Title from "../Title";
import Room from "./Room";

const StyledRooms = styled.div`
background-color: white;
display:flex;
flex-direction: column;
padding: 1em;
`

export default function() {
    // add creat room
    return (<StyledRooms>
        <Button text="Creat New Room"></Button>
        <Seperator></Seperator>
        <Title text="Rooms"></Title>
        <Room></Room>
        <Room></Room>
        <Room></Room>
        <Room></Room>
    </StyledRooms>)
}