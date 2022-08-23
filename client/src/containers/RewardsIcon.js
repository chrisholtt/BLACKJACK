import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'



const RewardsIcon = () => {
    return (
        <div className='nav-icon' style={{ fontSize: '42px' }}>
            <FontAwesomeIcon icon={faGem} />
        </div>
    )
}

export default RewardsIcon