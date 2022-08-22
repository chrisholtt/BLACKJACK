import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
const { blackjackGameLogic, getHandValue } = require('../gameLogic')




const Game = () => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [splitHand, setSplitHand] = useState([])
    const [palyerStand, setPlayerStand] = useState(false)
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
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
            .then(res => res.json())
            .then(data => setDeckId(data.deck_id))
    }, [])

    // auto stops when player has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setPlayerStand(true)
        }}, [playerHand])

    // Fetches the starting hands
    const handleClick = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                setDealersHand([data.cards[0], data.cards[1]])
                setPlayerHand([data.cards[2], data.cards[3]])
                setPlayerStand(false)
                splitButton()
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
    
    
    const handleHitClick = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            const copyHand = [...playerHand, data.cards[0]]
            setPlayerHand(copyHand)
        })
        if (getHandValue(playerHand) >21) {
            setPlayerStand(true)
        } 
    }
    
    // useEffect (() => {
    
    // }, [palyerStand])

    
    const dealerHit = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            const copyHand = [...dealersHand, data.cards[0]]
            setDealersHand(copyHand)
        })
    }
    
    const handleStandClick = () => {
        setPlayerStand(true);
        if (getHandValue(dealersHand) < 17) {
            dealerHit();
        }
    }

    const split = () => {
        setPlayerHand(playerHand[0])
        setSplitHand(playerHand[1])
    }
    
    const splitButton = () => {
        if (playerHand.length === 2) {
            if (playerHand[0].value === playerHand[1].value) {
                return <button onClick={split}>Split?</button>
            }
        }
    }
    
    console.log(playerHand[0].value, playerHand[1].value);

    const splitCardsNodes = splitHand.map((card, index) => {
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

                <div className="hand">
                    {splitCardsNodes}
                </div>

                {playerHand.length ? <button onClick={handleClick}>{palyerStand ? "Play again" : "Forfit" } </button> : <button onClick={handleClick}>Draw card</button>}

                {palyerStand ? <p>Play another round?</p> : <>
                {playerHand.length ? <button onClick={handleHitClick}>Hit</button> : <></> }
                {playerHand.length ? <button onClick={handleStandClick}>Stand</button> : <></> }
                </>}

                {splitButton()}


                {palyerStand ?<p>{winner}</p>:<p>{getHandValue(playerHand)}</p>}
            </div>
        </>
    )

}

export default Game