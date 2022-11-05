import React, { Component, useState, useEffect } from 'react'
import "./Moves.css"

export default function Moves(props) {
    const moves = [];
    return (
        <div className="scoreCard">
            {props.turn ? <p id='turn'>Tiger's Turn</p> : <p id='turn'>Lamb's Turn</p>}
            {/* {moves} */}
            {/* <div>
                <button>New Game</button>
                <button>Last Move</button>
                <button>Next Move</button>
            </div> */}
            {console.log(props)}
            <div className='moves'>
                
            </div>
            <button id="main" className='plus'></button>
            <button id="main" className='back'></button>
            <button id="main" className='forward'></button>

            {/* <button type="button" class="ui_v5-button-component ui_v5-button-basic primary-controls-button" data-cy="Move Forward" aria-label="Move Forward" data-listener-index="2">
                <span class="icon-font-chess ui_v5-button-icon chevron-right"></span>
            </button> */}
        </div>
    );
}