import React from "react";
import styled from "styled-components";
import Button from "../Button";

const StyledInputMessage = styled.div`
display: flex;
justify-content: space-between;
height: 30px;
input {
    width: 100%;
}
input,button {
        height: 100%;
    }
`

export default function () {
    return (<StyledInputMessage>
        <input type="text"></input>
        <button>send</button>
    </StyledInputMessage>)
}