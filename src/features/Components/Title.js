import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
    margin: 0.6em;
    font-size: 2rem;
`

export default function ({text}) {

    return (<StyledTitle>{text}</StyledTitle>);
}