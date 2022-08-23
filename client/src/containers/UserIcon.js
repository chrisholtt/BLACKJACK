import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserIcon = ({ user }) => {
    return (
        <div className='nav-icon' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '5px' }}>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '48px' }} />
            <h3>{user.name}</h3>
        </div>
    )
}

export default UserIcon