import React from "react";
import styled from "styled-components";

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
${props => props.min === "true" && `
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
export default function ({min, text, username}) {
    return (
    <StyledMessage min={min}>
        <div className="message-title">{username}</div>
        <div className="message-container">
            <div>{text}</div>
            <div>12:32</div>
        </div>
    </StyledMessage>
    )
}