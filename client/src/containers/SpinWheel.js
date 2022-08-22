import React, { useEffect, useState } from 'react'
import '../spinWheel.css'

const SpinWheel = ({ user, updateMoney }) => {
    const [wheelSpin, setWheelSpin] = useState(0)
    const [prize, setPrize] = useState(null)

    const getChoice = () => {
        const degrees = [
            0,
            45,
            90,
            135,
            180,
            225,
            270,
            315,
            360,
        ]
        const random = Math.ceil(Math.random() * 32);

        if (random >= 0 && random <= 8) {
            const spin = degrees[random]
            setWheelSpin(- spin)
            return (prizes[random])
        }
        else if (random >= 9 && random <= 17) {
            const spin = degrees[random - 9]
            setWheelSpin(- (spin + 360))
            return (prizes[random - 9])
        }
        else if (random >= 18 && random <= 26) {
            const spin = degrees[random - 18]
            setWheelSpin(- (spin + 720))
            return (prizes[random - 18])
        }
        else if (random >= 27 && random <= 35) {
            const spin = degrees[random - 27]
            setWheelSpin(- (spin + 1080))
            return (prizes[random - 27])
        }
    }

    const prizes = [
        100,
        300,
        150,
        0,
        500,
        1,
        1000,
        180,
    ]



    const handleClick = () => {
        // Spins the wheel and returns the prize 
        const prizeValue = getChoice()
        // waits 5 secs till wheel stops to set prize
        setTimeout(() => {
            setPrize(prizeValue)
        }, 5000)
    }

    // Whenever prize changes update users money
    useEffect(() => {
        updateMoney(prize)
    }, [prize])




    return (
        <>
            <div style={{ position: 'relative' }}>
                <button id="spin" onClick={handleClick}>Spin</button>
                <span className="arrow">⬇</span>
                <div className="prize-box">{prize ? `⭐️${prize}⭐️` : 'Spin to win!'}</div>
                <div className="wheel-container" style={{ transform: "rotate(" + wheelSpin + "deg)" }}>
                    <div className="one">💰{prizes[0]}💰</div>
                    <div className="two">💰{prizes[1]}💰</div>
                    <div className="three">💰{prizes[2]}💰</div>
                    <div className="four">💰{prizes[3]}💰</div>
                    <div className="five">💰{prizes[4]}💰</div>
                    <div className="six">💰{prizes[5]}💰</div>
                    <div className="seven">💰{prizes[6]}💰</div>
                    <div className="eight">💰{prizes[7]}💰</div>
                </div>
            </div>
        </>
    )
}

export default SpinWheel