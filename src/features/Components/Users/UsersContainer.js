import React, { useEffect } from "react";
import styled from "styled-components";
import UserNav from "./UserNav";
import Seperator from "../Seperator"
import Title from "../Title"
import { useState } from "react";
import Users from "./Users"
import UsersRoom from "./UsersRoom";
import { selectIsInRoom } from "../../Slices/RoomSlice";
import { useSelector } from "react-redux";

const StyledUsersContainer = styled.div`
    background-color: white;
    text-align: center;
    padding: 1rem;
`
export default function () {
    const [globalUsersSelected, setGlobalUsersSelected] = useState(true);
    const inRoom = useSelector(selectIsInRoom)

    useEffect(() => {
        setGlobalUsersSelected(true);
    }, [inRoom]);
    
    function showRoom() {
        if (inRoom)
        {
            setGlobalUsersSelected(false);
        }
    }
    return (<StyledUsersContainer>
        <UserNav></UserNav>
        <Seperator></Seperator>
        <Title text="Online Users"></Title>
        <div>
            <button type="button" onClick={() => setGlobalUsersSelected(true)}>Global</button>
            <button type="button" onClick={showRoom}>Room</button>
        </div>
        {globalUsersSelected ? <Users/>: <UsersRoom/>}
    </StyledUsersContainer>)
}