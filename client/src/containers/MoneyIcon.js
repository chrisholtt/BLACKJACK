import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'

const MoneyIcon = ({ user }) => {

    const [money, setMoney] = useState(user.money)
    const [newAmnt, setNewAmnt] = useState(null)
    const [counting, setCounting] = useState(false)

    const handleEnd = () => {
        setCounting(false)
        setMoney(newAmnt)
    }

    // When the users money value changes run this function
    useEffect(() => {
        setCounting(true)
        setNewAmnt(user.money)
    }, [user.money])


    return (
        <div className='nav-icon'>
            <div className='money-icon'>
                {counting ?
                    <div><FontAwesomeIcon icon={faSackDollar} style={{ color: 'whitesmoke' }} spin /> <CountUp start={money} end={newAmnt} onEnd={() => handleEnd()} style={{ color: 'whitesmoke' }} /></div>
                    :
                    <div style={{ display: 'flex' }}><FontAwesomeIcon icon={faSackDollar} style={{ color: 'whitesmoke' }} /> <h4 style={{ color: 'whitesmoke' }}>{money}</h4></div>}
            </div>
        </div>
    )
}

export default MoneyIcon