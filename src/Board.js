import { Box } from './Box.js'
import {useState, useRef, useEffect} from 'react';
import './Board.css'
import io from 'socket.io-client';

const socket = io();

export function Board(props)
{
    const [myList, changeList] = useState(['', '', '', '', '', '', '', '', '']);
    const [isx, changex] = useState([0]);
    // const [] = useState([props.username])
    const playerX = props.user_list[0];
    const playerO = props.user_list[1];
    
    function onClickDiv(index){
        const newList = [...myList];
        var countNonNull = 0;
        for(var i = 0; i <= 8; i++)
        {
            if(myList[i] == '')
            {
                continue;
            }
            else{
                countNonNull++;
            }
        }
        // newList.map(val => val == null ? '' : countNonNull++)
        console.log("non nulls: " + countNonNull);
        
        if(newList[index] == '')
        {
            if(isx[0] == 0 && playerX == props.name && countNonNull%2 == 0)
            {
                newList[index] = "X";
                changex([1])
                socket.emit("tiktaktoe", {arr: newList, xory: [1]});
                changeList(prevList => [...newList]);
                console.log(newList);
                // return;
            }
            else if(isx[0] == 1 && playerO == props.name && countNonNull%2 == 1)
            {
                newList[index] = "O";
                changex([0])
                socket.emit("tiktaktoe", {arr: newList, xory: [0]});
                changeList(prevList => [...newList]);
                console.log(newList);
                // return;
            }
        }
        else
        {
            console.log("X already exists");
        }
    }
    
    useEffect( () => {
        socket.on("tiktaktoe", (data) => {
            console.log("Tiktaktoe event received");
            console.log(data['arr']);
            console.log(data['xory']);
            changeList(prevList => [...data['arr']]);
            changex(prevList => data['xory'])
        });
    }, []);
    
    return(
        <div>
            <h4 style={{display:"inline"}}>Current user:</h4><p style={{display:"inline"}}>{props.name}</p>
            <br />
            <h4 style={{display:"inline"}}>Player X:</h4><p style={{display:"inline"}}> {playerX}</p>
            <br />
            <h4 style={{display:"inline"}}>Player O:</h4><p style={{display:"inline"}}> {playerO}</p>
            <br />
            <h4 style={{display:"inline"}}>Spectators:</h4>
            {props.user_list.map(function(item, index, list) {
                if(index != 0 && index != 1) 
                {
                    return <div><p style={{display:"inline"}}>&emsp;- {item}</p><br /></div>
                }
            })}
            <div class="board">
                <Box func={() => {onClickDiv(0)}} val={myList[0]}/>
                <Box func={() => {onClickDiv(1)}} val={myList[1]}/>
                <Box func={() => {onClickDiv(2)}} val={myList[2]}/>
                <Box func={() => {onClickDiv(3)}} val={myList[3]}/>
                <Box func={() => {onClickDiv(4)}} val={myList[4]}/>
                <Box func={() => {onClickDiv(5)}} val={myList[5]}/>
                <Box func={() => {onClickDiv(6)}} val={myList[6]}/>
                <Box func={() => {onClickDiv(7)}} val={myList[7]}/>
                <Box func={() => {onClickDiv(8)}} val={myList[8]}/>
            </div>
        </div>
    )
}


