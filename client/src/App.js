import { useEffect, useState } from 'react';
import './App.css';


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
