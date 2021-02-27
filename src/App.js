import './App.css';
import { Board } from './Board.js'
import './Board.css'
import React from 'react';
import {useState, useRef, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const usernameRef = useRef('');
  const [name, changeName] = useState('');
  const [list, changeList] = useState([]);
  const [playerType, changeType] = useState({'X': '', 'O': '', 'Spectator': []});
  
  function login()
  {
    if(usernameRef != '')
    {
      const username = usernameRef.current.value;
      console.log(username);
      changeName(username);
      changeList(prevList => [...prevList, username]);
      socket.emit('login', {userList: list});
      
      //add player types
      const newDict = {...playerType};
      
      // document.getElementById("login").style.visibility = "hidden";
      document.getElementById("boardy").style.visibility = "visible";
    }
  }
  
  return (
    <div class="overarching">
      <div id="login" style={{visibility:"visible"}}>
        <h3>Welcome to Tic-Tac-Toe</h3>
        <input type="text" ref={usernameRef} placeholder="Enter Username"/>
        <br/>
        <button type="button" onClick={() => login()}>Log me in bitch</button>
      </div>
      <br/>
      <div class="boardy" id="boardy" style={{visibility:"hidden"}}>
        <Board />
      </div>
    </div>
  );
}

export default App;
