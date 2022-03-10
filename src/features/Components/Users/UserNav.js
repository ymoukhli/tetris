import React from "react";
import styled from "styled-components";
import Button from "../Button";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../Slices/userSlice";

const StyledUserProfile = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function () {
    const user = useSelector(selectUser)

    return (<StyledUserProfile>
        <UserProfile user={user}></UserProfile>
        <Button text="Edit"></Button>
    </StyledUserProfile>);
}