import logo from './logo.svg';
import './App.css';
import Board from "./components/Board"
import Options from "./components/Options"
import React, { useState, useEffect } from 'react'

import Header from './components/Header'

import ligerrBoard from './assets/ligerrBoard.png'
import lambPiece from './assets/lambPiece.png'
import tigerPiece from './assets/tigerPiece.png'




function FirstRule() {
  return (
    <div className='firstRule'>
      <h1 id="heading">The Board</h1>
      <img id="ligerrBoard" src={ligerrBoard} alt="" />
      <p className="whiteText" id="summary">Ligerr is an Indian Inspired Board Game</p>
      <h2 className="whiteText" id="rules">Rules</h2>
      <p className="whiteText" id="placing">There are two teams, and they take turns placing</p>
      <p className="whiteText" id="lambsRules">15 Lambs</p>
      <p className="whiteText" id="tigersRules">3 Tigers</p>
      <p className="whiteText" id="lambsObjective">Lamb's Objective: To Trap all the Tigers</p>
      <p className="whiteText" id="tigersObjective">Tiger's Objective: To Kill 9 Lambs and Avoid Getting Trapped</p>
      


      {/* <img id="lambPiece" src={lambPiece} alt="" />
      <img id="tigerPiece" src={tigerPiece} alt="" /> */}
      <p></p>
    </div>
  )

}

function SecondRule() {
  return (
    <div className='secondRule'>
      <img id="lambPiece" src={lambPiece} alt="" />
      <img id="tigerPiece" src={lambPiece} alt="" />

      <h1 id="heading">The Pieces</h1>
    </div>
  )

}

function ThirdRule() {
  return (
    <div className='thirdRule'>
      <img src={ligerrBoard} alt="" />
      <h1 id="heading">The Rules</h1>
    </div>
  )

}

function App() {
  const [rulesClosed, setRulesClosed] = useState(false);

  return (
    <div className="app">
      {/* <Header /> */}

      {/* <Options playericon={playericon} computer={computer} settings={settings}/> */}
      {/* <Rules /> */}
      {/* {!rulesClosed && 
      <div className='popup'>
      <div>
        <span class="close" onClick={() => setRulesClosed(true)}>+</span>
      </div>
      <div className='content'>
        <FirstRule />
      </div>
    </div>      
    } */}
    {/* {rulesClosed && <Board position="start"/>} */}
    <Board position="start"/>
    </div>
  );
}

export default App;
