import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';



const User = ({ user, updateUserName }) => {
    const [name, setName] = useState('')

    const handleChange = (e) => {
        const { value } = e.target
        setName(value)
    }

    const handleClick = () => {
        if (!name) {
            return
        }
        updateUserName(name)
    }
    return (
        <>
            <div className="wrapper">
                <div className="game-mode-container">
                    <Link to="/"><Button color="error" variant="contained" >CLOSE</Button></Link>

                    <h1 style={{ color: 'white' }}>User Info:</h1>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="name" style={{ color: 'white' }}>Change nickname</label>
                        <input type="text" name='name' placeholder={user.name} onChange={handleChange} value={name} />
                        <button onClick={handleClick}>change</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default User