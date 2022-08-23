import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './containers/Navbar';
import User from './components/User';
import Level from './components/Level';
import Money from './components/Money';
import GameModes from './containers/GameModes';
import PlayerModes from './containers/PlayerModes';
import Game from './components/Game'
import Rewards from './components/Rewards';
import Rules from './components/Rules';
import { getLevel } from './levels';
import SettingsDial from './components/SettingsDial';
import SpinWheel from './containers/SpinWheel';
import Dice from './components/Dice';

function App() {

  const retrieveUser = () => {
    const localUser = JSON.parse(localStorage.getItem("user"))
    if (localUser) {
      return localUser
    }

    const noLocalUser = {
      name: 'User',
      money: 100,
      exp: 120
    }
    return noLocalUser
  }
  // const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")))
  const [user, setUser] = useState(retrieveUser())



  // On user change save in local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  // Assing users level when exp changes:
  useEffect(() => {
    const lvl = getLevel(user.exp)
    setUser((prev) => {
      return { ...prev, level: lvl }
    })
  }, [user.exp])

  const updateMoney = (amount) => {
    const newAmount = user.money + amount
    setUser(prev => {
      return { ...prev, money: newAmount }
    })
  }

  const updateMoneyDecrease = (amount) => {
    const newAmount = user.money - amount
    setUser(prev => {
      return { ...prev, money: newAmount }
    })
  }

  // Adds exp to user:
  const handleExpGain = (exp) => {
    const expToAdd = user.exp + exp
    setUser(prev => {
      return { ...prev, exp: expToAdd }
    })
  }

  const wagerLost = (amount) => {
    const newAmount = user.money - amount
    setUser(prev => {
      return { ...prev, money: newAmount }
    })
  }

  return (
    <div className='app-wrapper'>

      <div className="app">
        <Navbar user={user} updateMoney={updateMoney} />

        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/level" element={<Level />} />
          <Route path="/money" element={<Money />} />
          <Route path="/rewards" element={<Rewards user={user} updateMoney={updateMoney} handleExpGain={handleExpGain} />}>
            <Route path='wheel' element={<SpinWheel user={user} updateMoney={updateMoney} handleExpGain={handleExpGain} updateMoneyDecrease={updateMoneyDecrease} />} />
            <Route path='dice' element={<Dice updateMoney={updateMoney} updateMoneyDecrease={updateMoneyDecrease} user={user} handleExpGain={handleExpGain} />} />
          </Route>

          <Route path="/players1" element={<GameModes />} />
          <Route path="/players2" element={<GameModes />} />
          <Route path="/rules" element={<Rules />} />

          <Route path="/game1" element={<Game user={user} updateMoney={updateMoney} wagerLost={wagerLost} />} />
          <Route path="/game2" element={<Game />} />
        </Routes>



        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={() => setUser({
          name: 'chris',
          money: 1000,
          exp: 200
        })}>Click to reset user</button>

        <PlayerModes />
        <SettingsDial />

      </div>
    </div>
  );
}



export default App;
