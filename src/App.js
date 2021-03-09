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
  var [leaderboard, changeBoard] = useState({"users":[], "scores":[]});
  leaderboard = leaderboard ?? {};
  function login()
  {
    if(usernameRef != '')
    {
      const username = usernameRef.current.value;
      // console.log(username);
      changeName(username);
      /* for(const [name,points] of Object.entries(newBoard))
       {
         console.log(name);
         console.log(points);
       };
      */
      const tempList = [...list];
      tempList.push(username);
      changeList(tempList);
      socket.emit('login_info', {userList: tempList});
      
      const newBoard = {...leaderboard};
      // console.log("newBoard" + newBoard);  
      if(!(username in newBoard))
      {
        console.log(username);
        newBoard[username] = 100;
      }
      changeBoard(newBoard);
      socket.emit('leaderboard', {board: newBoard});
      
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
    
    socket.on("leaderboard", (data) =>{
      console.log("leaderboard info recieved");
      console.log(data["board"]);
      changeBoard(prevList => data["board"]);
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
        <Board user_list={list} name={name} lead={leaderboard}/>
      </div>
      <div>
      {Object.keys(leaderboard).map(key => <h2 key={key}>{key}&emsp;{leaderboard[key]}</h2>)}
      </div>
    </div>
  );
}

export default App;
