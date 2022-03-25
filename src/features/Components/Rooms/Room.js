/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useSelector } from "react-redux";
import { selectId } from "../../Slices/userSlice";
import styled from "styled-components";
import Button from "../Button";

const StyledRoom = styled.div`
    display:flex;
    margin: 0.4em 0;
    justify-content: space-between;
    background-color: rgb(234,234,234);
    padding: 0.4em 1em;
    border-radius: 0.6em;
    font-size: 1.1rem;
    .room-name div:nth-child(2) {
        font-size: 0.9rem;
    }
`

export default function({name,master,users}) {
    const myId = useSelector(selectId);
    console.log(master, myId, users);
    return (
    <StyledRoom>
        <div className="room-name">
            <div>{name}</div>
            <div>{users.join(', ')}</div>
            <div>{users.length} players</div>
        </div>
        {master !== myId && <Button text="Join"></Button>}
        {master === myId && <Button text="start"></Button>}
    </StyledRoom>
    )
}