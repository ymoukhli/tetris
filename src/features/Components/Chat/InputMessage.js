import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../../Slices/userSlice";
import Button from "../Button";

const StyledInputMessage = styled.div`
height: 30px;
form {
    display: flex;
    justify-content: space-between;
}
form input {
    width: 100%;
}
form, input, button {
        height: 100%;
    }
`

export default function ({type}) {
    const dispatch = useDispatch();
    const username = useSelector(selectUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(type)
        dispatch({type: type, payload: {text: e.target[0].value, username}})
        e.target[0].value = '';
    }
    return (<StyledInputMessage>
        <form onSubmit={handleSubmit}>
            <input type="text"></input>
            <button type="submit">send</button>
        </form>
    </StyledInputMessage>)
}