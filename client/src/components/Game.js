import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
const { blackjackGameLogic } = require('../gameLogic')




const Game = () => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [player, setPlayer] = useState({
        name: "",
        wallet: "",
        avatar: "",
        level: "",
        background: ""
    })
    const [winner, setWinner] = useState('')

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

    useEffect(() => {
        setWinner(blackjackGameLogic(dealersHand, playerHand))
    }, [playerHand])

    const dealerCardsNodes = dealersHand.map((card, index) => {
        return (
            <div className='hand' key={index}>
                <img key={index} src={card.image} alt="playing_card" />
            </div>
        )
    })

    const playerCardsNodes = playerHand.map((card, index) => {
        return (
            <Draggable>
                <img key={index} src={card.image} alt="playing_card" />
            </Draggable>
        )
    })

    return (
        <>
            <div className="game-wrapper">
                <Link to="/">CLOSE</Link>


                <div className="hand">
                    {dealerCardsNodes}
                </div>

                <hr />

                <div className="hand">
                    {playerCardsNodes}
                </div>

                <button onClick={handleClick}>Draw card</button>
                <p>{winner}</p>
            </div>
        </>
    )

}

export default Game