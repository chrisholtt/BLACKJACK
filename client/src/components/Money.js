import React from 'react'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";



const Money = ({ user }) => {
    return (
        <div className="wrapper">
            <div className="game-mode-container">
                <Link to="/"><Button color="error" variant="contained" >CLOSE</Button></Link>
                <h1 style={{ color: 'white' }}>Total cash: ${user.money}</h1>
                <h1 style={{ color: 'white' }}>Total earnings: ${user.totalEarnings}</h1>
            </div>
        </div>
    )
}

export default Money