import React from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";

const StyledUsers = styled.div`
padding-top: 2em;
display: flex;
flex-direction: column;
align-items: start;
`

export default function () {

    return (<StyledUsers>
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
    </StyledUsers>);
}