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
import styled from 'styled-components';


function App() {

  return (
    <div className='app-wrapper'>

      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/level" element={<Level />} />
          <Route path="/money" element={<Money />} />

          <Route path="/players1" element={<GameModes />} />
          <Route path="/players2" element={<GameModes />} />
          <Route path="/rules" element={<User />} />

          <Route path="/game1" element={<Game />} />
          <Route path="/game2" element={<Game />} />
        </Routes>



        <PlayerModes />

      </div>
    </div>





  );
}


export default App;
