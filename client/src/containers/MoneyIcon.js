import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';


const MoneyIcon = () => {
    const [money, setMoney] = useState(300)
    const [newAmnt, setNewAmnt] = useState(null)
    const [counting, setCounting] = useState(false)


    const handleClick = (newMoney) => {
        setCounting(true)
        setNewAmnt(newMoney)
    }

    const handleEnd = () => {
        setCounting(false)
        setMoney(newAmnt)
    }


    return (
        <div className='nav-icon'>
            <div style={{ fontSize: '42px' }}>
                💰
            </div>
            <button onClick={() => handleClick(800)}>Get cash </button>

            {counting ? <CountUp start={money} end={newAmnt} onEnd={() => handleEnd()} /> : <h1 style={{ color: 'red' }}>{money}</h1>}
        </div>
    )
}

export default MoneyIcon