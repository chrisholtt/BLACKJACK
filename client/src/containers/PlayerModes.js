import React from 'react'
import { Link } from "react-router-dom";


const PlayerModes = () => {
    return (
        <>
            <div><Link to="/players1">1 Player</Link>
            </div>
            <div><Link to="/players2">2 Players</Link>
            </div>
            <div><Link to="/rules">Rules</Link>
            </div>
        </>
    )
}


export default PlayerModes