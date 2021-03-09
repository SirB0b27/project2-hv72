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
  const [leaderboard, changeBoard] = useState({"one": "two", "three":"four"});
  
  function login()
  {
    if(usernameRef != '')
    {
      const username = usernameRef.current.value;
      // console.log(username);
      changeName(username);
      const newBoard = {...leaderboard};
      for(const name of newBoard.entries())
      {
        console.log(name);
      };
      
      const tempList = [...list];
      tempList.push(username);
      changeList(tempList);
      socket.emit('login_info', {userList: tempList});
      
      // document.getElementById("login").style.display = "none";
      document.getElementById("boardy").style.display = "inline";
    }
  }
  
  useEffect( () => {
    socket.on("login_info", (data) => {
      console.log("login event recieved");
      console.log(data['userList']);
      changeList(prevList => data['userList']);
    })
  }, []);
  
  return (
    <div class="overarching">
      <div id="login" style={{display:"inline"}}>
        <h3>Welcome to Tic-Tac-Toe</h3>
        <input type="text" ref={usernameRef} placeholder="Enter Username"/>
        <br/>
        <button type="button" onClick={() => login()}>Log me in bitch</button>
      </div>
      <br/>
      <div class="boardy" id="boardy" style={{display:"none"}}>
        <Board user_list={list} name={name}/>
      </div>
    </div>
  );
}

export default App;
