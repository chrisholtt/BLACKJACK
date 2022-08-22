import React from 'react'
import { Link } from "react-router-dom";
import UserIcon from './UserIcon';
import LevelIcon from './LevelIcon';
import MoneyIcon from './MoneyIcon';
import RewardsIcon from './RewardsIcon';

const Navbar = ({ user, updateMoney }) => {

    return (
        <div className='navbar'>
            <Link to="/user"><UserIcon /></Link>
            <Link to="/level"><LevelIcon level={user.level} exp={user.exp} /></Link>
            <Link to="/money"><MoneyIcon user={user} updateMoney={updateMoney} /></Link>
            <Link to="/rewards"><RewardsIcon /></Link>
        </div>
    )
}

export default Navbar