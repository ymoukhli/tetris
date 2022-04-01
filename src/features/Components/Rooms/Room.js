/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectId, selectUser } from "../../Slices/userSlice";
import styled from "styled-components";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

export default function({room,master,users,inRoom}) {
    const myId = useSelector(selectId);
    const user = useSelector(selectUser);
    const location = useLocation();
    const navigate = useNavigate();
    // const ready = useSelector(selectReadyState);
    const dispatch = useDispatch();
    function joinRoom() {
        navigate(`#${room}[${user}]`)
    }

    function leaveRoom() {
        navigate(``)
    }
    
    useEffect(() => {
        if (location.hash === '' && inRoom)
        {
            dispatch({type: 'leaveRoom', payload: room});
        }
    }, [location]);

    const joined = users.find(e => e === user);
    
    return (
    <StyledRoom>
        <div className="room-name">
            <h3>{room}</h3>
            <div>{users.join(', ')}</div>
            <div>{users.length} players</div>
        </div>
        <div>
            {inRoom && <Button text="leave" onClick={leaveRoom}></Button>}
            {master !== myId && !joined && <Button onClick={joinRoom} text="Join"/>}
            {master !== myId && joined && <Button onClick={() => console.log('ready')} text="ready"/>}
            {master === myId && <Button text="start"></Button>}
        </div>
    </StyledRoom>
    )
}