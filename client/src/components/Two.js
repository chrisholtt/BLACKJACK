import React, { useState } from 'react'

const Two = () => {
    const [result, setResult] = useState(null)
    const [temp, setTemp] = useState(false)
    const [tempResult, setTempResult] = useState(null)


    const handleClick = () => {
        setTemp(true)

        setTimeout(() => {
            setTempResult(1)
        }, 100)
        setTimeout(() => {
            setTempResult(2)
        }, 200)
        setTimeout(() => {
            setTempResult(1)
        }, 300)
        setTimeout(() => {
            setTempResult(2)
        }, 400)
        setTimeout(() => {
            setTempResult(1)
        }, 500)
        setTimeout(() => {
            setTempResult(2)
        }, 600)
        setTimeout(() => {
            setTempResult(1)
        }, 700)
        setTimeout(() => {
            setTempResult(2)
        }, 800)
        setTimeout(() => {
            setTempResult(1)
        }, 900)
        setTimeout(() => {
            setTempResult(2)
            setTemp(false)
            const random = Math.ceil(Math.random() * 2);
            setResult(random)
        }, 1000)
    }

    const TempBoxes = () => {
        return (
            <>
                <div className={tempResult === 1 ? 'two-box-red' : 'two-box'}></div>
                <br />
                <hr style={{ width: '40%' }} />
                <br />
                <div className={tempResult === 2 ? 'two-box-red' : 'two-box'}></div>
            </>
        )
    }

    const BoxResult = () => {
        return (
            <>
                <div className={result === 1 ? 'two-box-red' : 'two-box'}></div>
                <br />
                <hr style={{ width: '40%' }} />
                <br />
                <div className={result === 2 ? 'two-box-red' : 'two-box'}></div>
            </>
        )
    }

    return (
        <>
            {temp ? <TempBoxes /> : <BoxResult />}
            <button onClick={handleClick}>PLAY</button>

        </>
    )
}

export default Two