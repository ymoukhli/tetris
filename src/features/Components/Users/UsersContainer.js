import React from "react";
import styled from "styled-components";
import UserNav from "./UserNav";
import Seperator from "../Seperator"
import Title from "../Title"
import Switchs from "../Switchs"
import Users from "./Users"

const StyledUsersContainer = styled.div`
    background-color: white;
    text-align: center;
    padding: 1rem;
`
export default function () {
    const [globalUsersSelected, setGlobalUsersSelected] = useState(true);
    return (<StyledUsersContainer>

        <UserNav></UserNav>
        <Seperator></Seperator>
        <Title text="Online Users"></Title>
        <div>
            <button ></button>
            <button></button>
        </div>
        <Switchs></Switchs>
        {globalUsersSelected ? <Users/>: <RoomUsers/>}

    </StyledUsersContainer>)
}