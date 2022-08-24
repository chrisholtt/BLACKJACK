import React from 'react'
import { Link } from "react-router-dom";


const PlayerModes = () => {
    return (
        <div className='wrapper'>

            <div>
                <h1 style={{ color: 'white' }}>PICK A GAME MODE</h1>
                <div className='play-modes-container'>
                    <Link to="/players1"> <div className="play-mode" style={{ color: 'white' }}>1 Player</div> </Link>
                    <Link to="/rules"><div className="play-mode" style={{ color: 'white' }}>Rules</div></Link>
                </div>
            </div>
        </div>

    )
}


export default PlayerModes