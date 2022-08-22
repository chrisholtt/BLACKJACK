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
    const [splitStand, setSplitStand] = useState(false)
    const [player, setPlayer] = useState({
        name: "",
        wallet: "",
        avatar: "",
        level: "",
        background: ""
    })
    const [winner, setWinner] = useState('')
    const [splitWinner, setSplitWinner] = useState('')

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

    //auto stops if split hand has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setSplitSantd(true)
        }}, [splitHand])

        
    // Fetches the starting hands
    const handleClick = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(data => {
                setDealersHand([data.cards[0], data.cards[1]])
                setPlayerHand([data.cards[2], data.cards[3]])
                setSplitHand([])
                setPlayerStand(false)
                setSplitStand(false)
                splitButton()
            })
            if (playerHand[0].value === playerHand[1].value && playerHand[0].value ==="Ace") {
                split()
        }
        }
        useEffect(() => {
        setWinner(blackjackGameLogic(dealersHand, playerHand))
        setSplitWinner(blackjackGameLogic(dealersHand, splitHand))
    }, [playerHand])

    // separets the dealer's cards to show
    const dealerCardsNodes = dealersHand.map((card, index) => {
        return (
            <div className='hand' key={index}>
                <img key={index} src={card.image} alt="playing_card" />
            </div>
        )
    })
    
    // separets the player's cards to show
    const playerCardsNodes = playerHand.map((card, index) => {
        return (
            <Draggable>
                <img key={index} src={card.image} alt="playing_card" />
            </Draggable>
        )
    })
    
    // gives player anouther card, makes player stop if the card gets the points over 21
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
    
    // dealer getting another card, happens at the end of the game when player stands
    const dealerHit = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            const copyHand = [...dealersHand, data.cards[0]]
            setDealersHand(copyHand)
        })
    }
    
    // set player stand, allows dealer to play after
    const handleStandClick = () => {
        setPlayerStand(true);
        if (getHandValue(dealersHand) < 17) {
            dealerHit();
        }
    }

    const handleSplitStandClick = () => {
        setSplitStand(true);
        if (getHandValue(dealersHand) < 17) {
            dealerHit();
        }
    }

    // if there are two of the same value allows player to split and deal with each separatly
    const split = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const newHand = [playerHand[0], data.cards[0]]
            const newSplitHand = [playerHand[1], data.cards[1]]
            setPlayerHand(newHand)
            setSplitHand(newSplitHand)
        })
    }
    
    // the split button
    const splitButton = () => {
        if (playerHand.length === 2) {
            if (playerHand[0].value === playerHand[1].value) {
                return <button onClick={split}>Split?</button>
            }
        }
    }
    

    // shows the split hand
    const splitCardsNodes = splitHand.map((card, index) => {
        return (
            <Draggable>
                <img key={index} src={card.image} alt="playing_card" />
            </Draggable>
        )
    })

    // gives the split hand a card
    const handleSplitHit = () => {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            const copyHand = [...splitHand, data.cards[0]]
            setSplitHand(copyHand)
        })
    }


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

                {palyerStand && splitStand ? <p>Play another round?</p> : <>
                {playerHand.length ? <button onClick={handleHitClick}>Hit</button> : <></> }
                {splitHand.length ? <button onClick={handleSplitHit}>Hit second hand</button> : <></>}
                {playerHand.length ? <button onClick={handleStandClick}>Stand</button> : <></> }
                {splitHand.length ? <button onClick={handleSplitStandClick}>Stand split hand</button> : <></> }
                </>}

                {splitButton()}


                {palyerStand ?<p>{winner}</p>:<p>{getHandValue(playerHand)}</p>}
                {palyerStand && !splitHand.length ?<p>{splitWinner}</p>:<></>}
                {splitHand.length? getHandValue(splitHand) : <></>}
            </div>
        </>
    )

}

export default Game