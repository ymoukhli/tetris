import styled from "styled-components"

const StyledButton = styled.button`
    background-color: rgb(220,252,231);
    border-radius: 0.5rem;
    padding: 0.7rem 1.2rem;
    color: rgb(21, 128, 61);
    align-self: center;
    &:hover {
        background-color: rgb(187,247,208);
    }
`

export default function({type = "button", text, onClick}) {
    return (<StyledButton type={type} onClick={onClick}>{text}</StyledButton>);
}