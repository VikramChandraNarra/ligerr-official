import logo from './logo.svg';
import './App.css';
import Board from "./components/Board"
import Options from "./components/Options"

import ligerrBoard from './assets/ligerrBoard.png'
import lambPiece from './assets/lambPiece.png'
import tigerPiece from './assets/tigerPiece.png'


function FirstRule() {
  return (
    <div className='firstRule'>
      <img id="ligerrBoard" src={ligerrBoard} alt="" />
      <h1 id="heading">The Board</h1>
      <p id="summary">The Board Resembles a Pyramid Architect, and the Hierarchy of the Jungle</p>
      <img id="lambPiece" src={lambPiece} alt="" />
      <img id="tigerPiece" src={tigerPiece} alt="" />
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
function Rules() {
  return (
    <div className='popup'>
      <div>
        <span class="close">+</span>
      </div>
      <div className='content'>
        <FirstRule />
      </div>
    </div>
  )
}
function App() {
  return (
    <div className="app">

      {/* <Options playericon={playericon} computer={computer} settings={settings}/> */}
      {/* <Rules /> */}
      <Board position="start"/>
    </div>
  );
}

export default App;
