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
    // if((document.getElementById("currentUserName").value != ""))
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
      
      document.getElementById("login").style.display = "none";
      document.getElementById("loginButton").style.display = "none";
      document.getElementById("boardy").style.display = "inline";
      // sortedLeader = Object.fromEntries(Object.entries(leaderboard).sort(([,a],[,b]) => a-b));
      return true;
    }
    return false;
  }
  
  function show_leaderboard()
  {
    if(document.getElementById("renderLeaderboard").style.display == "none")
    {
      document.getElementById("renderLeaderboard").style.display = "block";
      document.getElementById("leaderboard").style.display = "block";
    }
    else if(document.getElementById("renderLeaderboard").style.display == "block")
    {
      document.getElementById("renderLeaderboard").style.display = "none";
      document.getElementById("leaderboard").style.display = "none";
    }
  }
  
  //DOESNT WORK IN JEST TESTING BECAUSE JEST TESTING USES OLDER VERSION OF NODE
  //got this sorting from: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  // const sortable = Object.fromEntries(
  //     Object.entries(leaderboard).sort(([,a],[,b]) => b-a)
  // );
  
  ////got this sorting from: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  const sortable = Object.entries(leaderboard)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  
  // console.log(sortable);
  
  useEffect( () => {
    socket.on("login_info", (data) => {
      // console.log("login event recieved");
      // console.log(data['userList']);
      changeList(prevList => data['userList']);
    })
    
    socket.on("from_db", (data) => {
      // console.log(data);
      changeLead(data);
    })
    
  }, []);
  
  
  //table information: https://www.w3schools.com/tags/tag_thead.asp
  return (
    <div className="overarching">
      <div id="login" style={{display:"inline"}}>
        <h3>Welcome to Tic-Tac-Toe</h3>
        <input type="text" ref={usernameRef} id="currentUserName" placeholder="Enter Username"/>
        <br/>
        <button id="loginButton" type="button" onClick={() => login()}>Log in</button>
      </div>
      <br/>
      <div className="boardy" id="boardy" style={{display:"none"}}>
        <Board user_list={list} name={name}/>
      </div>
      <button id="leaderboardButton" className="leaderboardButton" onClick={() => show_leaderboard()}>Click to see leaderboard</button>
      <div id="renderLeaderboard" className="renderLeaderboard" style={{display:"none"}}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th id= "leaderboard">User Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(sortable).map(key => <tr key={key} className={(document.getElementById("login").style.display == "none") ? (( key == document.getElementById("currentUserName").value) ? "currentUser" : "") : ""}><th>{key}</th><th>{sortable[key]}</th></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

