import  React, { useEffect, useReducer } from  'react';
import axios from 'axios';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import reducer from './reducer';
import socket from './socket';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  }

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM: JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };

  const addMessage = (msg) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: msg
    })
  }

  useEffect(() => {
    socket.on('ROOM: SET_USERS', setUsers);
    socket.on('ROOM: NEW_MESSAGE', addMessage);
  }, []);

  return (
    <div className='wrapper'>
      {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
