import React, { useEffect, useRef, useState } from 'react';
import socket from '../socket';

export default function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM: NEW_MESSAGE', {
      text: messageValue,
      userName,
      roomId
    });
    onAddMessage({ 
      userName,
      text: messageValue 
    });
    setMessageValue('');
  }

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  console.log(messages);

  return (
    <div className='chat'>
      <div className='chat-users'>
        <b>Комната: ({roomId})</b>
        <hr/>
        <b>Онлайн: ({users.length})</b>
        <ul>
          {users.map((user, idx) => (
            <li key={user  +idx}>{user}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages'>
        <div ref={messagesRef} className='messages'>
          {
            messages.map( message => (
              <div className='message'>
                <p>{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))
          }
          
        </div>
        <form>
        <textarea
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          className='form-control'
          rows='3'
        ></textarea>
        <button onClick={onSendMessage} type='button' className='btn btn-primary'>
          Send
        </button>
      </form>
      </div>
    </div>
  );
}