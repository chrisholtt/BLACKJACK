import React from 'react'
import { Link } from "react-router-dom";
import Game from '../components/Game';


const GameModes = () => {
    return (
        <div className='game-mode-container'>
            <h1>Game Select</h1>
            <div className="games">
                <Game />
                <Game />
                <Game />
            </div>
        </div>
    )
}

export default GameModes