import React from 'react'
import { Link } from "react-router-dom";


const PlayerModes = () => {
    return (
        <div className='wrapper'>

            <div>
                <h1 className='white-text-backdrop'>PICK A GAME MODE</h1>
                <div className='play-modes-container'>
                    <Link to="/players1"> <div className="play-mode" style={{ color: 'white' }}>PLAY GAME</div> </Link>
                    <Link to="/rules"><div className="play-mode" style={{ color: 'white' }}>RULES</div></Link>
                </div>
            </div>
        </div>

    )
}


export default PlayerModes