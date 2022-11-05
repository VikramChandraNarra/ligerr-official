import './Header.css'

import React, { Component, useState, useEffect } from 'react'

export default function Header() {
    return (
        <menu>
            <li className='menu'><button>Menu</button></li>
            <li className="title">Ligerr</li>
            <li className='help'><button>?</button></li>
            <li className='settings'><button>Settings</button></li>
        </menu>

    );
}