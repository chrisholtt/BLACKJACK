import React from 'react'
import { Link } from "react-router-dom";


const PlayerModes = () => {
    return (
        <div className='play-modes-wrapper'>
            <div className='play-modes-container'>
                <div className='play-mode'><Link to="/players1">1 Player</Link>
                </div>
                <div><Link to="/players2">2 Players</Link>
                </div>
                <div><Link to="/rules">Rules</Link>
                </div>
            </div>
        </div>

    )
}


export default PlayerModes