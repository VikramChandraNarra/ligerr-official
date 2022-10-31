import React, { Component } from 'react'
import "./Options.css"



export default function Options({ playericon, computer, settings  }) {
    return (
      <div className='menu'>
        <div className='single-player card'>
            <img className="img" src={playericon} alt="" />
            <h1>Single-Player</h1>
            <p>Play locally against your friends</p>
        </div>
        <div className='computer card'>
            <img className="img" src={computer} alt="" />
            <h1>Computer</h1>
            <p>Play with AI and hoopefully you can beat the never loosing computer</p>
        </div>
        <div className='settings card'>
            <img className="img" src={settings} alt="" />
            <h1>Settings</h1>
            <p>Change Settings</p>
        </div>
      </div>
    )
}

