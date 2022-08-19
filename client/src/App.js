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
      { if(index === 0) {<p>Back of card</p>} else {const showCard = {card}}}
    return (<div>
      <img key={index} src={showCard.image}/>
    </div>)
  })

  "this should be feture only"


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
        {playerHand.length && playerCardsNodes}
      </div>

    </div>



  );
}

export default App;
