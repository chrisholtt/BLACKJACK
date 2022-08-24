import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'

const HL = ({ user, updateMoneyDecrease, updateMoney }) => {
    const [result, setResult] = useState(null)
    const [guess, setGuess] = useState(null)
    const [tempResult, setTempResult] = useState(null)
    const [playing, setPlaying] = useState(false)
    const [wager, setWager] = useState(0)


    const handleChange = (e) => {
        const { id } = e.target
        setGuess(id)
    }

    const handleDoubleDown = () => {
        if (user.money < wager * 2) {
            return
        }
        setWager(prev => prev * 2)
    }

    const getWinner = () => {
        if (result == parseInt(guess)) {
            updateMoney(wager * 2)
        } else if (result != parseInt(guess)) {
            updateMoneyDecrease(wager)
        }
    }

    const handleInc = () => {
        setWager(prev => prev + 100)
    }

    const handleDec = () => {
        if (wager == 0) {
            return
        }
        setWager(prev => prev - 100)
    }

    const BoxNodes = () => {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div className={result == 1 || tempResult == 1 ? 'hl-box-on' : 'hl-box'}>HIGH</div>
                    <input type="radio" name="hl" id={1} checked={guess == 1} onChange={handleChange} />
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                    <div className={result == 2 || tempResult == 2 ? 'hl-box-on' : 'hl-box'}>LOW</div>
                    <input type="radio" name="hl" id={2} checked={guess == 2} onChange={handleChange} />
                </div>
            </>
        )
    }

    const playGame = () => {
        setPlaying(true)
        setResult(null)
        const random = Math.ceil(Math.random() * 2);

        setTimeout(() => {
            setTempResult(1)
        }, 200)
        setTimeout(() => {
            setTempResult(2)
        }, 400)
        setTimeout(() => {
            setTempResult(1)
        }, 600)
        setTimeout(() => {
            setTempResult(2)
        }, 800)
        setTimeout(() => {
            setTempResult(1)
        }, 1000)
        setTimeout(() => {
            setTempResult(2)
        }, 1200)
        setTimeout(() => {
            setTempResult(1)
        }, 1400)
        setTimeout(() => {
            setTempResult(2)
        }, 1600)
        setTimeout(() => {
            setTempResult(1)
        }, 1800)
        setTimeout(() => {
            setResult(random)
            setTempResult(null)
            setPlaying(false)
            getWinner()

        }, 2000)
    }

    const WinningNode = () => {
        return (
            <>
                <button onClick={handleDoubleDown}>DOUBLE DOWN?</button>
            </>
        )
    }

    const WagerBoxHl = () => {
        return (
            <div className='wager-box-hl'>

                <div className="hl-wager-container">

                    <div className="hl-wager-wrapper">
                        <div className="hl-wager-title">
                            <h2>MAKE WAGER!</h2>
                        </div>
                        <div className='hl-wager-counter'>
                            <button onClick={handleDec} className="hl-btn">-</button>
                            <h2><FontAwesomeIcon icon={faSackDollar} />{wager}</h2>
                            <button onClick={handleInc} className="hl-btn">+</button>
                        </div>
                    </div>
                    <div className="hl-wager-wrapper">
                        <div className="hl-wager-title">
                            <h2>WAGER POT</h2>
                        </div>
                        <div>
                            <h3>current wager: {wager}</h3>
                            <h3>potential payout: {wager * 2}</h3>
                        </div>
                    </div>
                    <button onClick={playGame}>PLAY</button>
                    {!playing && <h4>{result == guess ? <WinningNode /> : 'shit luck'} </h4>}

                </div>


            </div>
        )
    }




    return (
        <div>
            <BoxNodes />
            <WagerBoxHl />
            {playing && <h1>Flipping...</h1>}
        </div>
    )
}

export default HL;