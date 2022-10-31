import logo from './logo.svg';
import './App.css';
import Board from "./components/Board"
import Options from "./components/Options"

import computer from './assets/computer.png'
import playericon from './assets/playericon.png'
import settings from './assets/settings.png'


function App() {
  return (
    <div className="app">
      {/* <Options playericon={playericon} computer={computer} settings={settings}/> */}
      <Board position="start"/>
    </div>
  );
}

export default App;
