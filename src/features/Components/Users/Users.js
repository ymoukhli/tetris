import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectOtherUsers, selectUser } from "../../Slices/userSlice";
import UserProfile from "./UserProfile";

const StyledUsers = styled.div`
padding-top: 2em;
display: flex;
flex-direction: column;
align-items: start;
`

export default function () {
    const users = useSelector(selectOtherUsers);
    const myusername = useSelector(selectUser);
    console.log(users);
    // const otherUsers = users.map(user => user !== myusername && <UserProfile key={user} user={user}></UserProfile>);
    return (
    <StyledUsers>
        {/* {otherUsers} */}
    </StyledUsers>);
}