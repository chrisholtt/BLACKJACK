import React from 'react'
import { Link } from "react-router-dom";


const PlayerModes = () => {
    return (
        <div className='wrapper'>

            <div>
                <h1>Pick a game mode:</h1>
                <div className='play-modes-container'>
                    <Link to="/players1"> <div className="play-mode">1 Player</div> </Link>
                    <Link to="/players2"><div className="play-mode">2 Players</div></Link>
                    <Link to="/rules"><div className="play-mode">Rules</div></Link>
                </div>
            </div>

        </div>

    )
}


export default PlayerModes