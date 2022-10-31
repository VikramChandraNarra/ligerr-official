import { isCursorAtEnd } from '@testing-library/user-event/dist/utils';
import React, { Component, useState, useEffect } from 'react'
import "./Board.css"

const axis = ["a1", "b1", "b2", "b3", "b4", "b5", "b6", "c1", "c2", "c3", "c4", "c5", "c6", "d1", "d2", "d3", "d4", "d5", "d6", "e1", "e2", "e3", "e4"];

export default function Board({ position }) {
    const gameBoard = [["", "a1", "a1", "a1", "a1", ""], ["b1", "b2", "b3", "b4", "b5", "b6"], ["c1", "c2", "c3", "c4", "c5", "c6"], ["d1", "d2", "d3", "d4", "d5", "d6"], ["", "e1", "e2", "e3", "e4", ""]]
    
    const [secondClick, setSecondClick] = useState(false);
    const [pastPosition, setPastPosition] = useState();
    const [curFen, setCurFen] = useState();
    const [moves, setMoves] = useState([]);
    const [lionCount, setLionCount] = useState(0);
    const [sheepCount, setSheepCount] = useState(0);
    const [turn, setTurn] = useState(true); //True means that it's the lions turn, false is sheep
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState()
    const [killed, setKilled] = useState(0);

    const handleClick = (move) => {
        setMoves(moves => [...moves, move])
    }
    const addMove = () => {
        setMoves([...moves, {
            fen: curFen,
            lions: lionCount,
            sheeps: sheepCount,
            turn: turn,
        }])
    }
    // useEffect(() => {
    //     addMove()
    //     console.log(moves)
    // }, [])
    useEffect(() => {
        addMove()
        status()
        console.log("what")
    }, [curFen])


    
    let board = [];
    for (let i=0; i<axis.length;i++) {
        board.push(
            <div key={axis[i]} title={axis[i]} className='tile' onClick={(e) => move(e.target)} id={axis[i]}></div>
        )
    }
    function findInArr( pos ) {
        let arr = [1, 2]
        for (var i=0; i<gameBoard.length; i++) {
            for (var j=0; j<6;j++) {
                if (gameBoard[i][j] == pos) {
                    return [i, j]
                }
            }
        }
    }
    function availableMove(arrayBoard, y, x) {

        // 1 - True
        // 0 - False
        console.log(arrayBoard)
        var isValid = 0;
        if (x - 1 >= 0 && y - 1 >= 0 && x + 1 <= 5 && y + 1 <= 4) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y][x+1] == 'E' || arrayBoard[y-1][x] == 'E' || arrayBoard[y+1][x] == 'E') {
                isValid = 1
            } 
        } else if (x - 1 >= 0 && y - 1 >= 0 && x + 1 <= 5) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y][x+1] == 'E' || arrayBoard[y-1][x] == 'E') {
                isValid = 1
            }
        } else if (y - 1 >= 0 && x + 1 <= 5 && y + 1 <= 4) {
            if (arrayBoard[y][x+1] == 'E' || arrayBoard[y-1][x] == 'E' || arrayBoard[y+1][x] == 'E') {
                isValid = 1
            }
        } else if (x - 1 >= 0 && x + 1 <= 5 && y + 1 <= 4) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y][x+1] == 'E' || arrayBoard[y+1][x] == 'E') {
                isValid = 1
            }

        } else if (x - 1 >= 0 && y - 1 >= 0 && y + 1 <= 4) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y-1][x] == 'E' || arrayBoard[y+1][x] == 'E') {
                isValid = 1
            }

        }else if (x - 1 >= 0 && y - 1 >= 0) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y-1][x]) {
                isValid = 1

            }

        }else if (x - 1 >= 0 && y + 1 <= 4) {
            if (arrayBoard[y][x-1] == 'E' || arrayBoard[y+1][x]) {
                isValid = 1

            }
        }else if (x + 1 <= 5 && y - 1 >= 0) {
            if (arrayBoard[y][x+1] == 'E' || arrayBoard[y-1][x]) {
                isValid = 1

            }
        }else if (x + 1 <= 5 && y + 1 <= 4) {
            if (arrayBoard[y][x+1] == 'E' || arrayBoard[y+1][x]) {
                isValid = 1
            }
     
        }

        
        return isValid


   

        // for (var i=-1; i<2; i+=2)// Horizontal Entries
        // {
        //    if (x + i >= 0 && x + i <= 5 && arrayBoard[y][x+i] == "E")
        //    {
        //       isValid = 1;
        //    }
        // }
        // for (var j=-1; j<2; j+=2)// Vertial Entries
        // {
     
     
        //    if (y == 1)
        //    {
        //       // Unique Case y = 1
        //       if (x == 0)
        //       {
        //          if (arrayBoard[y][x+1] == "E" || arrayBoard[y-1][x] == "E")
        //          {
        //             isValid = 1;
        //          }
        //       }else if (x == 5){
        //          if (arrayBoard[y][x-1] == "E" || arrayBoard[y-1][x] == "E")
        //          {
        //             isValid = 1;
        //          }
     
        //       }else {
        //          if (arrayBoard[0][2] == "E" || arrayBoard[y-1][x] == "E")
        //          {
        //             isValid = 1;
        //          }
        //       }
        //    }
     
        //    if (x + j >= 1 && x + j <= 5 && arrayBoard[y+j][x] == "E")
        //    {
        //       isValid = 1;
        //    }
        // }
        // return isValid;
     
     }

    const status = () => {
    
        var temp = statusOfGame(convertToReadable(curFen))
        console.log("temp " + temp)
        if (temp == 1) {
            //Lions
            setGameOver(true)
            setWinner("SHEEPS")
        }else if (temp == -1) {
            //Sheep
            setGameOver(true)
            setWinner("LIONS")

        }
    }
    const statusOfGame = (arrayBoard) => {
        if (arrayBoard == undefined) {
            return
        }
        var numberOfTigersTrapper = 0;
        var noOfTigers = 0;
        var noOfLambs = 0;
        var noOfEmpty = 0;
        for (var i=0; i<5; i++)
        {
           for (var j=0; j<6; j++)
           {

              if (arrayBoard[i][j] == "L")
              {
                 noOfTigers++;
                 console.log("testing " + availableMove(arrayBoard, i, j))
                 if (availableMove(arrayBoard, i, j) == 0)
                 {
                    
                    numberOfTigersTrapper++;
                 }
              }else if (arrayBoard[i][j] == 'S')
              {
                 noOfLambs++
              }
           }
        }
        // console.log(numberOfTigersTrapper)
     
        if (numberOfTigersTrapper == 3)
        {
           return 1;
        }else if (noOfTigers == 3 && killed >= 9)
        {
           return -1;
        }
        return 0;
        // Return the status of the board
        // 1 - Tiger Win
        // 0 - No Win Detected
        // -1 - Lambs Win
       
     
        // Convert the FEN string into readable game logic.
        // If Tiger can't move -> Lambs Win
        // If Tiger >= Lambs -> Tiger Wins
        // If a move is repeated 3 times -> Tie
    }

    
    // Returns whatever the current Fen of the board is
    const updateFen = () => {
        var fen = "";
        var counter = 0;
        for (var i=0; i<board.length; i++) {
            var temp = document.getElementById(board[i].key)
            if (temp.className == "tile") {
                counter++
            } else if (temp.className == "tile lion") {
                if (counter != 0) {
                    fen += counter.toString()
                }
                fen += "L"
                counter = 0
            } else if (temp.className == "tile sheep") {
                if (counter != 0) {
                    fen += counter.toString()
                }
                fen += "S"
                counter = 0
            }
        }
        if (counter != 0) {
            fen += counter.toString()
        }

        return fen
    }
    // Displays whatever Fen is onto the board
    const setFen = ( fen ) => {

     
        var regexStr = fen.slice(0, fen.length).match(/[a-z]+|[^a-z]+/gi); // [ 'LLTLLTLLTL', '2', 'LL', '1', 'LLL', '1', 'LL', '1', 'L' ]
        var counter = 0;
        let arrLen = regexStr.length
        for (let k = 0; k < arrLen; k++) {
            if (isNaN(regexStr[k]) == true) {
                //String
                for (let j = 0; j < regexStr[k].length; j++) {
                    var temp = document.getElementById(board[counter].key)
                    if (regexStr[k][j] == "L") {
                        temp.className = "tile lion"

                    } else if (regexStr[k][j] == "S") {
                        temp.className = "tile sheep"
                    }
                    counter++
                }


            } else {
                for (let j = 0; j < parseInt(regexStr[k]); j++) {
                    var temp = document.getElementById(board[counter].key)
                    temp.className = "tile"
                    counter++
                }
            }
        }

    }

    // 
    function convertToReadable( fen ) {
        if (fen == undefined || fen == "") {
            return
        }
        var arrayStr = []
        var arrayBoard = [[], [], [], [], []]
        var regexStr = fen.slice(0, fen.length).match(/[a-z]+|[^a-z]+/gi); // [ 'LLTLLTLLTL', '2', 'LL', '1', 'LLL', '1', 'LL', '1', 'L' ]
        var counter = 0;
        let arrLen = regexStr.length
        for (let k = 0; k < arrLen; k++) {
            if (isNaN(regexStr[k]) == true) {
                //String
                for (let j = 0; j < regexStr[k].length; j++) {
                    if (regexStr[k][j] == "L") {
                        arrayStr.push("L")

                    } else {
                        arrayStr.push("S")

                    }
                }


            } else {
                for (let j = 0; j < parseInt(regexStr[k]); j++) {
                    arrayStr.push("E")
                }
            }
        }

        arrayBoard[0].push("0", arrayStr[0], arrayStr[0], arrayStr[0], arrayStr[0], "0")
        arrayBoard[1].push(arrayStr[1], arrayStr[2], arrayStr[3], arrayStr[4], arrayStr[5], arrayStr[6])
        arrayBoard[2].push(arrayStr[7], arrayStr[8], arrayStr[9], arrayStr[10], arrayStr[11], arrayStr[12])
        arrayBoard[3].push(arrayStr[13], arrayStr[14], arrayStr[15], arrayStr[16], arrayStr[17], arrayStr[18])
        arrayBoard[4].push("0", arrayStr[19], arrayStr[20], arrayStr[21], arrayStr[22], "0")
        return arrayBoard

    }

    const toBoard = ( fen ) => {
        
    }
    const arrPos = ( pos ) => {
        var sample = []
        for (var i = 0; i < gameBoard.length; i++) {
            for (var j = 0; j < gameBoard[0].length; j++) {
                if (pos == gameBoard[i][j]) {
                    sample.push(i)
                    sample.push(j)
                    return sample
                }
            }
        }
    }

    const isKill = ( pastPos, newPos ) => {
        var vals = arrPos(pastPos.id)
        var x1 = vals[0];
        var y1 = vals[1];

        vals = arrPos(newPos.id)

        var x2 = vals[0];

        var y2 = vals[1];

        if (x1 == 0 || x2 == 0) {
            //Top Position
            if (x1 == 0) {
                // The last position was in the top
                if (x2 == 2 && document.getElementById(gameBoard[1][y2]).className == "tile sheep" && y2 >= 1 && y2 <= 4) {
                    document.getElementById(pastPos.id).className = "tile"

                    document.getElementById(gameBoard[1][y2]).className = "tile"
                    document.getElementById(gameBoard[x2][y2]).className = "tile lion"
                    setKilled(killed + 1)
                    setSheepCount(sheepCount - 1)
                    return true
                }
                return false
            } else {
                if (x1 == 2 && document.getElementById(gameBoard[1][y1]).className == "tile sheep" && y1 >= 1 && y1 <= 4) {
                    document.getElementById(pastPos.id).className = "tile"
                    document.getElementById(gameBoard[1][y1]).className = "tile"
                    document.getElementById(axis[0]).className = "tile lion"
                    setSheepCount(sheepCount - 1)
                    setKilled(killed + 1)

                    return true
                }
                return false
            }
        } else {
            var changex = Math.abs(x1 - x2)
            var changey = Math.abs(y1 - y2)
            if (changex == 2 ) {

                if (changey == 0 && document.getElementById(gameBoard[(x1 + x2)/2][y1]).className == "tile sheep") {

                    document.getElementById(pastPos.id).className = "tile"
                    document.getElementById(gameBoard[(x1 + x2)/2][y1]).className = "tile"
                    document.getElementById(gameBoard[x2][y2]).className = "tile lion"
                    setSheepCount(sheepCount - 1)
                    setKilled(killed + 1)

                    return true
                }
                return false
            } else if (changey == 2) {
                if (changex == 0 && document.getElementById(gameBoard[x1][(y1 + y2) / 2]).className == "tile sheep") {

                    document.getElementById(pastPos.id).className = "tile"
                    document.getElementById(gameBoard[x1][(y1 + y2) / 2]).className = "tile"
                    document.getElementById(gameBoard[x2][y2]).className = "tile lion"
                    setSheepCount(sheepCount - 1)
                    setKilled(killed + 1)

                    return true
                }
                return false
            } else {
                return false
            }
        }


    }

    const isRegularMove = ( pastPos, newPos ) => {
        var vals = arrPos(pastPos.id)
        var x1 = vals[0];
        var y1 = vals[1];

        vals = arrPos(newPos.id)
        var x2 = vals[0];
        var y2 = vals[1];


        var changex = Math.abs(x1 - x2);
        var changey = Math.abs(y1 - y2);
        if (x1 == 0 || x2 == 0) {
            if (x1 == 0) {
                if (x2 == 1 && y2 >= 1 && y2 <= 4) {
                    if (turn == true) {
                        document.getElementById(axis[0]).className = "tile"
                        document.getElementById(gameBoard[x2][y2]).className = "tile lion"
                        return true

                    } else {
                        document.getElementById(axis[0]).className = "tile"
                        document.getElementById(gameBoard[x2][y2]).className = "tile sheep"
                        return true

                    }               
                }

                return false
            } else { // x2 == 0
                if (x1 == 1 && y1 >= 1 && y1 <= 4) {
                    if (turn == true) {
                        document.getElementById(axis[0]).className = "tile lion"
                        document.getElementById(gameBoard[x1][y1]).className = "tile"
                        return true
                    } else {
                        document.getElementById(axis[0]).className = "tile sheep"
                        document.getElementById(gameBoard[x1][y1]).className = "tile"
                        return true
                    }

                }
                return false
            }

        } else {
            if ((changex == 1 && changey == 0) || (changey == 1 && changex == 0)){
                if (turn == true) {
                    document.getElementById(gameBoard[x2][y2]).className = "tile lion"
                    document.getElementById(gameBoard[x1][y1]).classList = "tile"
                    return true
                } else {
                    document.getElementById(gameBoard[x2][y2]).className = "tile sheep"
                    document.getElementById(gameBoard[x1][y1]).classList = "tile"
                    return true
                }
            }
            return false

        }

    }

    const checkValidLion = ( pastPos, newPos ) => {
        if (isKill(pastPos, newPos) == true) {
            return true
        } else if (isRegularMove(pastPos, newPos) == true) {
            return true
        }
        return false
    }
    const checkValidSheep = ( pastPos, newPos ) => {
        if (isRegularMove(pastPos, newPos) == true) {
            return true
        }
        return false

    }
    const checkLionCount = ( fen ) => {
        var count = 0
        for ( var i = 0; i < fen.length; i++) {
            if (fen[i] == "L") {
                count++
            }
        }
        return count
    }

    const checkSheepCount = ( fen ) => {
        var count = 0
        for ( var i = 0; i < fen.length; i++) {
            if (fen[i] == "S") {    
                count++
            }
        }
        return count
    }

    const undoMove = () => {
        if (moves.length >= 2) {
            var temp = moves[moves.length - 2]
            setCurFen(temp.fen)
            setLionCount(temp.lions)
            setSheepCount(temp.lions)
            setTurn(temp.turn)
            setFen(temp.fen)
            setMoves(moves.slice(0, moves.length - 2))
        }

    }

    const move = ( target ) => {

        if (lionCount == 3 && turn == true) { //Means that the Lions must start sliding 

            if (secondClick == false && target.className == "tile lion") {  // First Click for moving the lion
                console.log("first click lion")
                setSecondClick(true);
                setPastPosition(target)
            } else if (secondClick == true && target.className == "tile lion") { // Updating the lion that needs to be moved
                console.log("updating first move")
                setPastPosition(target)

            } else if ((target.className == "tile sheep" || target.className == "tile") && pastPosition != undefined && pastPosition.className != "tile lion") { // Not valid
                console.log("not valid click")

            } else {    //Valid Click
                if (target.className == "tile" && pastPosition != undefined && pastPosition.className == "tile lion" && secondClick == true) {

                    if (checkValidLion(pastPosition, target) == true) {
                        setPastPosition(null)
                        setSecondClick(false)
                        setTurn(!turn)
                        setCurFen(updateFen())


                        console.log("second click succesfull")
                    } else {
                        console.log("incorrect move lion")
                    }
                }
            }
        } else if (sheepCount >= 15 && turn == false ) {    // Means that the sheep must start sliding
            if (secondClick == false && target.className == "tile sheep") {
                console.log("first clik")
                setSecondClick(true);
                setPastPosition(target)

            } else if (secondClick == true && target.className == "tile sheep") {
                console.log("updating sheep first move")
                setPastPosition(target)

            }
            else if ((target.className == "tile lion" || target.className == "tile") && pastPosition != undefined && pastPosition.className != "tile sheep") {
                console.log("not valid click")

            } else {
                if (target.className == "tile" && pastPosition != undefined && pastPosition.className == "tile sheep" && secondClick == true) {
                    if (checkValidSheep(pastPosition, target) == true) {
                        setPastPosition(null)
                        setSecondClick(false)
                        setTurn(!turn)
                        setCurFen(updateFen())

                        console.log("second click sheep")
                    } else {
                        console.log("incorrect click")
                    }
                }    
            }

        } else {        // Lions need to be placed on the board

            if (target.className == "tile") {            
                setTurn(!turn)
                if (turn == true) {
                    target.className = "tile lion"
                    setLionCount(lionCount + 1)
                    setCurFen(updateFen())
                } else {
                    target.className = "tile sheep"
                    setSheepCount(sheepCount + 1)
                    setCurFen(updateFen())
                }
            }
        }
    }


    return (
        <>
            <div className='heading'>
                {/* this goes on top */}
                {turn ? <h1 id="lionText">LIONS</h1> : <h1 id="sheepText">SHEEPS</h1>}
            </div>
            <div id="board">
                {board}
            </div>
            <div>
                {/* This goes below */}
                { moves.length > 1 && <button onClick={() => undoMove()}>Undo</button>}
                {/* { moves.length > 1 && <button>Redo</button>} */}
                {gameOver && <h1 className='white'>{winner + " win!"}</h1>}
            </div>
        </>

    )
}
