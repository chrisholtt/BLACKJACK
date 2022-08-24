import React from 'react'
import { Link, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';



const Rewards = () => {
    return (
        <div className='wrapper'>

            <div className='rewards-container'>
                <Link to="/"><Button color="error" variant="contained" >CLOSE</Button></Link>
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
                    <Link to="/rewards/HL">
                        <div className="rewards-nav-icon" style={{ background: '#4caf50' }}>H/L</div>
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