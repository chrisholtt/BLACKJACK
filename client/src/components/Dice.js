import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'

const Dice = ({ updateMoney, updateMoneyDecrease, user, handleExpGain }) => {
    const [wager, setWager] = useState(0)
    const [roll, setRoll] = useState(null)
    const [rollText, setRollText] = useState(null)
    const [guess, setGuess] = useState(null)
    const [message, setMessage] = useState(null)


    const handleInc = () => {
        if (wager < 100) {
            setWager(prev => prev + 10)
        } else if (wager >= 100 && wager <= 900) {
            setWager(prev => prev + 100)
        } else if (wager >= 1000) {
            setWager(prev => prev + 1000)
        }
    }
    const handleDec = () => {
        if (wager === 0) {
            return
        }
        if (wager < 100) {
            setWager(prev => prev - 10)
        } else if (wager >= 100 && wager <= 900) {
            setWager(prev => prev - 100)
        } else if (wager >= 1000) {
            setWager(prev => prev - 1000)
        }
    }

    const rollDice = () => {
        if (!wager || !guess) {
            alert('Please have a wager and a guess to play')
            return
        }

        if (user.money < wager) {
            alert('not enough funds')
            return
        }

        setRoll(null)
        setMessage(null)
        updateMoneyDecrease(wager)

        setTimeout(() => {
            setRollText('Rolling')
        }, 500)
        setTimeout(() => {
            setRollText('Rolling.')
        }, 1000)
        setTimeout(() => {
            setRollText('Rolling..')
        }, 1500)
        setTimeout(() => {
            setRollText('Rolling...')
        }, 2000)
        setTimeout(() => {
            setRollText(null)
            const random = Math.ceil(Math.random() * 6);
            setRoll(random)
            setMessage(`Better luck next time`)
            handleExpGain(25)

            // If guess is right pay user x 6 of wager value
            if (guess == random) {
                updateMoney(wager * 6)
                setMessage(`Congratulations, you won ${wager * 6}`)
            }
        }, 2500)



    }

    return (
        <div className='dice-wrapper'>
            <div className="dice-container">
                <img src="/static/dice.gif" alt="" />
                <h3>{guess ? `guess: ${guess}` : `make a guess`}</h3>
                <div>
                    <input type="radio" name='guess' value={1} onChange={() => setGuess(1)} />
                    <input type="radio" name='guess' value={2} onChange={() => setGuess(2)} />
                    <input type="radio" name='guess' value={3} onChange={() => setGuess(3)} />
                    <input type="radio" name='guess' value={4} onChange={() => setGuess(4)} />
                    <input type="radio" name='guess' value={5} onChange={() => setGuess(5)} />
                    <input type="radio" name='guess' value={6} onChange={() => setGuess(6)} />

                </div>
                <h2>PLACE A WAGER</h2>
                <div className="dice-wager">
                    <button onClick={handleDec}>-</button>
                    <h1><FontAwesomeIcon icon={faSackDollar} />  {wager}</h1>
                    <button onClick={handleInc}>+</button>
                </div>
                <button className='dice-roll' onClick={rollDice}>ROLL</button>
            </div>

            <div className="dice-prize-container">
                <h3>Potential payout: <FontAwesomeIcon icon={faSackDollar} /> {wager * 6}</h3>
                <h2>{rollText}</h2>
                <h1>{roll && `dice rolled: ${roll}`}</h1>
                <h3>{message}</h3>
            </div>
        </div>
    )
}

export default Dice