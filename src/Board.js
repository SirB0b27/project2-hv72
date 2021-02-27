import { Box } from './Box.js'
import {useState, useRef, useEffect} from 'react';
import './Board.css'
import io from 'socket.io-client';

const socket = io();

export function Board(props)
{
    const [myList, changeList] = useState([]);
    const [isx, changex] = useState([0]);
    // const [] = useState([props.username])
    
    function onClickDiv(index){
        const newList = [...myList];
        if(newList[index] == null)
        {
            if(isx[0] == 0)
            {
                newList[index] = "X";
                changex(prevList => [1])
                socket.emit("tiktaktoe", {arr: newList, xory: [1]});
            }
            else if(isx[0] == 1)
            {
                newList[index] = "O";
                changex(prevList => [0])
                socket.emit("tiktaktoe", {arr: newList, xory: [0]});
            }
        }
        else
        {
            console.log("X already exists");
        }
        
        newList[index] = "X";
        changeList(prevList => [...newList]);
        console.log(newList);
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
    )
}