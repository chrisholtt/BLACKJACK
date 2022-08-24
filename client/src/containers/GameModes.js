import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'



const GameModes = ({ user }) => {


    const GameModeLocked = () => {
        return (
            <div className="game-icon-locked">
                <div className="game-locked-banner">
                    <h2>GAME MODE LOCKED</h2>
                </div>
            </div>
        )
    }


    return (
        <div className="wrapper">
            <div className='game-mode-container' style={{ color: 'white' }}>
                <Link to="/">❌</Link>
                <h1>Game Select</h1>
                <div className="games">

                    {user.level >= 1 ?
                        <Link to="/game1">
                            <div className='game-icon' style={{ color: 'white' }}>
                                <h2>Edinburgh</h2>
                                <div>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </div>
                                <div>
                                    <h3>Max payout: $500</h3>
                                    <h4>Level required: 1</h4>
                                </div>
                            </div>
                        </Link>
                        :
                        <GameModeLocked />
                    }
                    {user.level >= 3 ?
                        <Link to="/game2">
                            <div className='game-icon' style={{ color: 'white' }}>
                                <h2>Tokyo</h2>
                                <div>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </div>
                                <div>
                                    <h3>Max payout: $3000</h3>
                                    <h4>Level required: 3</h4>
                                </div>
                            </div>
                        </Link>
                        :
                        <GameModeLocked />
                    }
                    {user.level >= 10 ?
                        <Link to="/game3">
                            <div className='game-icon' style={{ color: 'white' }}>
                                <h2>Las Vegas</h2>
                                <div>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </div>
                                <div>
                                    <h3>Max payout: $6000</h3>
                                    <h4>Level required: 10</h4>
                                </div>
                            </div>
                        </Link>
                        :
                        <GameModeLocked />
                    }
                </div>
            </div>
        </div>
    )
}

export default GameModes