import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
const StyledRoomInput = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    width: 100vw;
    height: 100vh;
    form {
        padding: 1em;
        display: flex;
        flex-direction: column;
        border-radius: 0.4em;
        background-color: white;
        button {
            margin: 1.2em 2em 0.2em;
        }
    }

`

export default function ({ setRoomInput }) {
    const roomInputRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        function handleClickMouse(event) {
            if (roomInputRef.current && !roomInputRef.current.contains(event.target))
            {
                setRoomInput(false);
            }
        }
        document.addEventListener("mousedown", handleClickMouse);

        return (() => {
            document.removeEventListener("mousedown", handleClickMouse)
        })
    }, [roomInputRef])


    function handleSubmit (event) {
        event.preventDefault();

        setRoomInput(false);
        dispatch({type: 'creatRoom', payload: {room: event.target[0].value}})
    }
    return (<StyledRoomInput >
        <form  onSubmit={handleSubmit} ref={roomInputRef}>
            <input type="text"></input>
            <button type="submit">Creat</button>
        </form>
    </StyledRoomInput>)
}