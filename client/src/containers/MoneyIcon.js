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
            <div style={{ fontSize: '42px' }}>
            </div>
            {counting ? <div><FontAwesomeIcon icon={faSackDollar} spin /> <CountUp start={money} end={newAmnt} onEnd={() => handleEnd()} /></div>
                : <div><FontAwesomeIcon icon={faSackDollar} /> {money}</div>}
        </div>
    )
}

export default MoneyIcon