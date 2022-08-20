import React from 'react'
import { Link } from "react-router-dom";



const GameModes = () => {
    return (
        <div className="wrapper">
            <div className='game-mode-container'>
                <Link to="/">❌</Link>
                <h1>Game Select</h1>
                <div className="games">
                    <Link to="/game1">
                        <div className="game-icon">
                            <h2>Edinburgh</h2>
                            <h3>Max payout: xxx</h3>
                            <h4>Level required: 1</h4>
                        </div>
                    </Link>
                    <Link to="/game2">
                        <div className="game-icon">
                            <h2>Tokyo</h2>
                            <h3>Max payout: xxx</h3>
                            <h4>Level required: 3</h4>
                        </div>
                    </Link>
                    <Link to="/game3">
                        <div className="game-icon">
                            <h2>Las Vegas</h2>
                            <h3>Max payout: xxx</h3>
                            <h4>Level required: 10</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GameModes