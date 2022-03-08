import React from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledSwitchs = styled.div`
display: flex;
width: 100%;
align-self: start;
button {
    margin-left: 2em;
}
`
export default function () {

    return (
    <StyledSwitchs>
        <Button text="Global"></Button>
        <Button text="Room"></Button>
    </StyledSwitchs>);
}