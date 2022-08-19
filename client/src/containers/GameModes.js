import React from 'react'
import { Link } from "react-router-dom";



const GameModes = () => {
    return (
        <div className='game-mode-container'>
            <h1>Game Select</h1>
            <Link to="/">close</Link>
            <div className="games">
                <Link to="/game1">Game 1</Link>
                <Link to="/game2">Game 2</Link>
                <Link to="/game3">Game 3</Link>
            </div>
        </div>
    )
}

export default GameModes