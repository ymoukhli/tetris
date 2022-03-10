import React, { useEffect } from "react";
import styled from "styled-components";

const StyledUserProfile = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.6em;
    .name {
        padding: 0rem 2rem;
    }
`

export default function ({user}) {

    return (<StyledUserProfile>
        <img src={"https://ui-avatars.com/api/?size=40&name="+ user}></img>
        <div className="name">
            <div>{user}</div>
            <div>note...</div>
        </div>
    </StyledUserProfile>);
}
    