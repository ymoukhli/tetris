import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import styled from 'styled-components'
import UsersContainer from './features/Components/Users/UsersContainer';
import Rooms from './features/Components/Rooms/Rooms';
import Chat from './features/Components/Chat/Chat';
import { selectLog } from './features/join/loggedSlice';
import { useSelector } from 'react-redux';
import Button from './features/Components/Button';
import { selectSocket, connectingSocket } from './features/sockets.slice';
import { useDispatch } from 'react-redux';
import { addUser } from './features/Slices/userSlice';

const StyledApp = styled.div`
background-color: gray;
height: 100vh;
  .landingPage {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .landingPage form{
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: white;
      padding: 1em;
      border-radius: 0.4em;
  }
  .landingPage form input {
    margin-bottom: 1.2em;
  }
  .lobby {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
    overfloa: hidden;
    box-sizing: border-box;
  }
`

function App() {
  const joined = useSelector(selectLog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectingSocket);
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addUser(e.target[0].value))
  }
  
  return (
    <StyledApp>
      {!joined &&
      <div className="landingPage">
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>username</label>
          <input name='username' id='username' type="text" required></input>
          <Button type="submit" text="submit"></Button>
        </form>
      </div>}
      {joined && 
      <div className="lobby">
        <UsersContainer></UsersContainer>
        <Rooms></Rooms>
        <Chat></Chat>
      </div>}
    </StyledApp>
  );
}

export default App;
