import React from "react";
import styled from "styled-components";
import Button from "../Button";

const StyledRoom = styled.div`
    display:flex;
    margin: 1em 0;
    justify-content: space-between;
    background-color: rgb(234,234,234);
    padding: 0.4em 1em;
    border-radius: 0.6em;
    font-size: 1.1rem;
    .room-name div:nth-child(2) {
        font-size: 0.9rem;
    }

`

export default function() {
    return (<StyledRoom>
        <div className="room-name">
            <div>Room Dyali</div>
            <div>4 players</div>
        </div>
        <Button text="Join"></Button>
        
    </StyledRoom>)
}