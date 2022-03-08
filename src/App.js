import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import styled from 'styled-components'
import UsersContainer from './features/Components/Users/UsersContainer';
import Rooms from './features/Components/Rooms/Rooms';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  height: 100vh;
  background-color: gray;
  box-sizing: border-box;
`

function App() {
  return (
    <StyledApp>
      <UsersContainer></UsersContainer>
      <Rooms></Rooms>
      {/* <Chat></Chat> */}
    </StyledApp>
  );
}

export default App;
