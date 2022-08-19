import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [deckId, setDeckId] = useState(null)
  const [playerHand, setPlayerHand] = useState([])

  // Fetch all cards
  useEffect(() => {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeckId(data.deck_id))
  }, [])

  const handleClick = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      // .then(data => setPlayerHand(prev => [...prev, data]))
      .then(data => setPlayerHand([data.cards[0]]))
  }

  const cardNodes = playerHand.map((card, index) => {
    return (
      <img key={index} src={card.image} />
    )
  })





  return (
    <div className="App">

      <button onClick={handleClick}>Draw card</button>
      {playerHand.length && cardNodes}
    </div>
  );
}

export default App;
