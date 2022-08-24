import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getLevelPercentage } from '../levels'

const LevelIcon = ({ level, exp }) => {
    const [levelChanging, setLevelChanging] = useState(false)
    const [levelPercentage, setLevelPercentage] = useState(20)

    // On users level changing:
    useEffect(() => {
        setLevelChanging(true)
        setTimeout(() => {
            setLevelChanging(false)
        }, 2000)

        if (level) {
            setLevelPercentage(getLevelPercentage(level, exp))
        }

    }, [level, exp])





    return (
        <div className='nav-icon'>
            <div className="level-icon">
                {levelChanging ?
                    <div>
                        <FontAwesomeIcon icon={faStar} style={{ color: 'whitesmoke' }} spin />
                        <h1 className='level-changing'>{level}</h1>
                    </div>
                    :
                    <div>
                        <FontAwesomeIcon icon={faStar} style={{ color: 'whitesmoke' }} />
                        <h1 className='level-changed'>{level}</h1>
                    </div>
                }

                <div className="level-progress-wrapper">
                    <div className="level-progress" style={{ width: levelPercentage }}></div>
                </div>
            </div>
        </div>
    )
}

export default LevelIcon