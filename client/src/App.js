import { useEffect, useState } from 'react';
import Draggable from "react-draggable"
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './containers/Navbar';
import User from './components/User';
import Level from './components/Level';
import Money from './components/Money';
import GameModes from './containers/GameModes';
import PlayerModes from './containers/PlayerModes';
import styled from 'styled-components';


function App() {

  const [deckId, setDeckId] = useState(null)
  const [dealersHand, setDealersHand] = useState([])
  const [playerHand, setPlayerHand] = useState([])

  // Fetch all cards
  useEffect(() => {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeckId(data.deck_id))
  }, [])


  // Fetches the starting hands
  const handleClick = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
      .then(res => res.json())
      .then(data => {
        setDealersHand([data.cards[0], data.cards[1]])
        setPlayerHand([data.cards[2], data.cards[3]])
      })
  }

  const playerCardsNodes = playerHand.map((card, index) => {
    return (
      <Draggable>
        <div>
          <img key={index} src={card.image} />
        </div>
      </Draggable>
    )
  })

  const dealerCardsNodes = dealersHand.map((card, index) => {
    return (<div>
      <img key={index} src={card.image}/>
    </div>)
  })


  return (
    <div className='app-wrapper'>

      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/level" element={<Level />} />
          <Route path="/money" element={<Money />} />
        </Routes>



        <PlayerModes />

        <GameModes />




        <button onClick={handleClick}>Draw card</button>
        <DealrHand>
        {dealerCardsNodes}
        </DealrHand>
        <hr/>
        {playerHand.length && playerCardsNodes}
      </div>

    </div>



  );
}

const DealrHand = styled.ul`
display: flex;
justify-content: center;
flex-direction: row;
`

export default App;
