import React from 'react'
import { Link, Outlet } from "react-router-dom";


const Rewards = () => {
    return (
        <div className='wrapper'>

            <div className='rewards-container'>
                <Link to="/">❌</Link>
                <div className="rewards-display">
                    <Outlet />
                </div>
                <div className="rewards-nav">

                    <Link to="/rewards/wheel">
                        <div className="rewards-nav-icon" style={{ background: '#4caf50' }}>WHEEL</div>
                    </Link>
                    <Link to="/rewards/dice">
                        <div className="rewards-nav-icon" style={{ background: '#f44336' }}>DICE</div>
                    </Link>
                    <Link to="/rewards/wheel">
                        <div className="rewards-nav-icon" style={{ background: '#4caf50' }}>RPS</div>
                    </Link>
                    <Link to="/rewards/wheel">
                        <div className="rewards-nav-icon" style={{ background: '#f44336' }}>DAILY</div>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Rewards