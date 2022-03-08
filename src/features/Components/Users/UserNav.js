import React from "react";
import styled from "styled-components";
import Button from "../Button";
import UserProfile from "./UserProfile";

const StyledUserProfile = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function () {

    return (<StyledUserProfile>
        <UserProfile></UserProfile>
        <Button text="Edit"></Button>
    </StyledUserProfile>);
}