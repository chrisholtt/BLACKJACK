import React from 'react'
import { Routes, Route, Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to="/user">User</Link>
            <Link to="/level">level</Link>
            <Link to="/money">money</Link>
        </div>
    )
}

export default Navbar