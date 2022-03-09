import React from "react";
import styled from "styled-components";

export default function (props) {
    const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.2em;
    
    .message-container {
        width: 85%;
        background-color: #ECECEC;
        padding: 0.4em 0.3em;
        border-radius: 0.4em;
        display: flex;
        flex-direction: column;
    }
    .message-container div:nth-child(2) {
        font-size: 0.7rem;
        align-self: end;
    }
    ${props => props.min && `
    .message-title {
        align-self: end;
    }
    .message-container {
            align-self: end;
            background-color: #A8C2FB;
    }
    .message-container div:nth-child(2) {
            align-self: start;
    }
    `}
`
    return (
    <StyledMessage min={props.min}>
        <div className="message-title">youssef moukhlis</div>
        <div className="message-container">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum doloribus voluptate quod debitis? Repellat dolores, at velit ex doloribus enim natus. Ab necessitatibus blanditiis quasi quidem ut maxime rem debitis.</div>
            <div>12:32</div>
        </div>
    </StyledMessage>
    )
}