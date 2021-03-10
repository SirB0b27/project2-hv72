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
  const [leaderboard, changeLead] = useState({});
  
  function login()
  {
    if(usernameRef != '')
    {
      const username = usernameRef.current.value;
      // console.log(username);
      changeName(username);
      const tempList = [...list];
      tempList.push(username);
      changeList(tempList);
      socket.emit('login_info', {userList: tempList});
      
      const tempDict = {...leaderboard}
      if(!(username in tempDict))
      {
        tempDict[username] = 100
        changeLead(tempDict)
        socket.emit("add_user", username)
      }
      
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
    
    socket.on("from_db", (data) => {
      console.log(data);
      changeLead(data);
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
      <div>
      {Object.keys(leaderboard).map(key => <h2 key={key}>{key}&emsp;{leaderboard[key]}</h2>)}
      </div>
    </div>
  );
}

export default App;
