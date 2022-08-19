import React from 'react'
import { Link } from "react-router-dom";
import Game from '../components/Game';


const GameModes = () => {
    return (
        <div className='game-mode-container'>
            <Game />
            <Game />
            <Game />
        </div>
    )
}

export default GameModes