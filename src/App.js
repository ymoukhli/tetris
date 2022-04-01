import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
import UsersContainer from './features/Components/Users/UsersContainer';
import Rooms from './features/Components/Rooms/Rooms';
import Chat from './features/Components/Chat/Chat';
import { selectLog } from './features/Slices/loggedSlice';
import { useSelector } from 'react-redux';
import Button from './features/Components/Button';
import { connectingSocket } from './features/sockets.slice';
import { useDispatch } from 'react-redux';
import { addUser } from './features/Slices/userSlice';
import { useLocation } from 'react-router-dom';
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
`;

function App() {
  const joined = useSelector(selectLog);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(connectingSocket);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addUser(e.target[0].value))
  };
  
  useEffect(() => {
    console.log({location});
    if (!location.hash) return ;
    const hash = location.hash.match(/^#([a-z]+)\[([a-z]+)]/i);
    if (!hash) return ;
    if (hash[0].length == hash.input.length)
    {
      console.log('matched');
      dispatch({type: 'joinRoom', payload: hash[1]})
    }
  }, [location]);

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
