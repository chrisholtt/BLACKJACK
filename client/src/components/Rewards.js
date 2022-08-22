import React from 'react'
import SpinWheel from '../containers/SpinWheel'
import { Link } from "react-router-dom";


const Rewards = ({ user, updateMoney }) => {
    return (
        <div className='wrapper'>

            <div className='rewards-container'>
                <Link to="/">❌</Link>
                <div className="rewards-display">

                    <SpinWheel user={user} updateMoney={updateMoney} />

                </div>

                <div className="rewards-nav">
                    <h1>Maybe</h1>
                    <h1>have</h1>
                    <h1>links</h1>
                    <h1>here?</h1>
                </div>
            </div>

        </div>
    )
}

export default Rewards