import React, { Component, useState, useEffect } from 'react'
import "./Moves.css"

export default function Moves(props) {
    const movesData = [];
    for (let i=1; i<props.moves.length;i++) {
        movesData.push(
            <div key={props.moves[i].fen} className='unitonMove' id={props.moves[i].turn ? "true" : "false"}>
                <h4 className='num'>{`${i}.`}</h4>
                <h3 className='fen'>{props.moves[i].fen}</h3>
            </div>
        )
    }

    // const renderMoves = []
    // if (movesData.length & 2 == 1) {
    //     var i = 0
    //     for (i = 0; i< movesData.length & 2; i++) {
    //         renderMoves.push(
    //             <div key={i} className='move' id={props.moves[i].turn ? "true" : "false"}>
    //                 {movesData[2*i]}
    //                 {movesData[(2*i)+1]}
    //             </div>
    
    //         )
    //     }
    //     renderMoves.push(
    //         <div key={i} className='move' id={props.moves[i].turn ? "true" : "false"}>
    //         {movesData[2*i]}
    //     </div>
    //     )
    // } else {
    //     for (let i = 0; i< movesData.length & 2; i++) {
    //         renderMoves.push(
    //             <div key={i} className='move' id={props.moves[i].turn ? "true" : "false"}>
    //                 {movesData[i]}
    //                 {movesData[i+1]}
    //             </div>
    
    //         )
    //     }
    // }

    return (
        <div className="scoreCard">
            {props.turn ? <p className='lionText' id='turn'>Tiger's Turn</p> : <p className='sheepText' id='turn'>Lamb's Turn</p>}
            {/* {console.log(renderMoves)} */}
    
            <div className='moves'>
                {movesData}
            </div>
            <button id="main" className='plus'></button>
            <button id="main" className='back'></button>
            <button id="main" className='forward'></button>

        </div>
    );
}