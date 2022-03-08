import React from "react";
import styled from "styled-components";

const StyledUserProfile = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.6em;
    .name {
        padding: 0rem 2rem;
    }
`

export default function () {

    return (<StyledUserProfile>
        <img src="https://ui-avatars.com/api/?name=youssef+moukhlis"></img>
        <div className="name">
            <div>youssef moukhlis</div>
            <div>note...</div>
        </div>
    </StyledUserProfile>);
}
    