import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getLevelPercentage } from '../levels';
import Button from '@mui/material/Button';



const Level = ({ levels, user }) => {

    const [levelPercentage, setLevelPercentage] = useState(null)

    const levelNodes = levels.map((level) => {
        if (user.level > level.level) {
            return <h1 className='completed-level' style={{ color: 'white' }}>lvl: {level.level}</h1>
        } else if (user.level == level.level) {
            return <h1 className='current-level' style={{ color: 'white' }}>lvl: {level.level}</h1>
        } else {
            return <h1 style={{ color: 'white' }}>lvl: {level.level}</h1>
        }
    })

    useEffect(() => {
        setLevelPercentage(getLevelPercentage(user.level, user.exp))
    }, [])

    return (
        <div className="wrapper">
            <div className="game-mode-container">
                <Link to="/"><Button color="error" variant="contained" >CLOSE</Button></Link>
                {levelNodes}
                <br />
                <h2 style={{ color: 'white' }}>Total: {user.exp}xp</h2>
                <br />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ color: 'white' }}>{user.level}</h3>
                    <div className="level-progress-wrapper-not-nav">
                        <div className="level-progress" style={{ width: levelPercentage }}></div>
                    </div>
                    <h3 style={{ color: 'white' }}>{user.level + 1}</h3>
                </div>
                <h3 style={{ color: 'white' }}>{user.exp} / {levels[user.level].exp} xp</h3>

            </div>
        </div>
    )
}

export default Level