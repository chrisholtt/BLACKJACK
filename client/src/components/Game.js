import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
const { blackjackGameLogic, getHandValue } = require('../gameLogic')

const Game = ({user, updateMoney, wagerMoney, wagerLost}) => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [splitHand, setSplitHand] = useState([])
    const [palyerStand, setPlayerStand] = useState(false)
    const [splitStand, setSplitStand] = useState(false)
    const [winner, setWinner] = useState('')
    const [splitWinner, setSplitWinner] = useState('')
    const [wager, setWager] = useState(0)
    const [inPlay, setInPlay] = useState(false)
    const [playAgain, setPlayAgain] = useState(false);

    // Fetch all cards
    useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
            .then(res => res.json())
            .then(data => setDeckId(data.deck_id))
    }, [])

    useEffect(() => {
        console.log(playAgain);
    }, [playAgain])

    // auto stops when player has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setPlayerStand(true)
            wagerLost(wager);
            setWager(0);
            setInPlay(false);
            setPlayAgain(true);
        }}, [playerHand])

    //auto stops if split hand has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setSplitStand(true)
        }}, [splitHand])

    const handlePlayAgain = () => {
        setDealersHand([]);
        setPlayerHand([]);
        setPlayAgain(false);
    }
        
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
                setInPlay(true);
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
    
    // set player stand, allows dealer to play after, payout acording to who won
    const handleStandClick = () => {
        setPlayerStand(true);
        if (getHandValue(dealersHand) < 17) {
            dealerHit();
        }
        if (blackjackGameLogic(dealersHand, playerHand) === "Player wins" || blackjackGameLogic(dealersHand, playerHand) === "Dealer bust"){
            updateMoney(wager * 2)
            setWager(0)
            setInPlay(false);
            setPlayAgain(true);
        }
         else if (blackjackGameLogic(dealersHand, playerHand) === "Dealer wins") {
            wagerLost(wager);
            setWager(0);
            setInPlay(false);
            setPlayAgain(true);
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

    //wager buttons
    const handlwage1 = () => {
        if(user.money > 0) {
            // const newAmount = user.money - 1
            const newWage = wager + 1
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }
    const handlwage2 = () => {
        if(user.money > 1) {
            // const newAmount = user.money - 2
            const newWage = wager + 2
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }
    const handlwage5 = () => {
    if(user.money > 4) {
        // const newAmount = user.money - 5
        const newWage = wager + 5
        // wagerMoney(newAmount)
        setWager(newWage)
    }
}
const handlwage10 = () => {
        if(user.money > 9) {
            // const newAmount = user.money - 10
            const newWage = wager + 10
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }
    const handlwage20 = () => {
        if(user.money >= 20) {
            // const newAmount = user.money - 20
            const newWage = wager + 20
            // wagerMoney(newAmount)
            setWager(newWage)
            setInPlay(false);
        }
    }
    const handlwage50 = () => {
    if(user.money >= 50) {
        // const newAmount = user.money - 50
        const newWage = wager + 50
        // wagerMoney(newAmount)
        setWager(newWage)
        setInPlay(false);
    }
    }

    const showDrawCardOrWager = () => {
        // if(!inPlay && wager===0) {
        //     return (
        //         <button onClick={handlwage10}>Wager</button> 
        //     )
        // // } else if(!inPlay && wager>0) {
        // //     return (
        // //         <button onClick={handleClick}>Play again</button>
        // //     )
        // } else if(!inPlay && wager>0) {
        //     return (
        //         <button onClick={handleClick}>Draw card</button>
        //     )
        // } else if(playAgain) {
        //     return (
        //         <button onClick={handleClick}>Play again</button>
        //     )
        // }
        if(playAgain) {
            return (
                <button onClick={handlePlayAgain}>Play again</button>
            )
        } else if(!inPlay && wager===0) {
            return (
                <button onClick={handlwage10}>Wager</button> 
            )
        } else if(!inPlay && wager>0) {
            return (
                <button onClick={handleClick}>Draw card</button>
            )
        }

        // if(wager>0) {
        //     return (
        //         <button onClick={handleClick}>Draw card</button>
        //     )
        // } else {
        //     return (
        //         <button onClick={handlwage10}>Wager</button> 
        //     )
        // }
    }

        return (
        <>
            <div className="game-wrapper">
                <Link to="/">CLOSE</Link>

            <div className='top-half'>

                <div className="hand">
                    {dealerCardsNodes}
                </div>
            {/* {playerHand.length ? 
            <div className='wager'>
                <button onClick={handlwage1}>wager 1</button>
                <button onClick={handlwage2}>wager 2</button>
                <button onClick={handlwage5}>wager 5</button>
                <button onClick={handlwage10}>wager 10</button>
                <button onClick={handlwage20}>wager 20</button>
                <button onClick={handlwage50}>wager 50</button>
            </div>
            : <></>
            } */}
            </div>
                <p> your wager is: {wager}</p>
                <hr />

                <div className="hand">
                    {playerCardsNodes}
                </div>

                <div className="hand">
                    {splitCardsNodes}
                </div>

                {/* {playerHand.length ? <button onClick={handleClick}>{palyerStand ? "Play again" : "Forfit" } </button> : <button onClick={handleClick}>Draw card</button>} */}

                {/* {if(wager>0) {<button onClick={handleClick}>Draw card</button>} 
                <div>
                    <button onClick={handlwage10}>Wager</button>    
                </div>} */}

                {/* {inPlay ? <button onClick={handleClick}>Draw card</button> : <button onClick={handlwage10}>Wager</button>} */}

                {/* {showDrawCardOrWager()} */}

                {palyerStand && splitStand ? <p>Play another round?</p> : <>
                {playerHand.length ? <button onClick={handleHitClick}>Hit</button> : <></> }
                {splitHand.length ? <button onClick={handleSplitHit}>Hit second hand</button> : <></>}
                {playerHand.length ? <button onClick={handleStandClick}>Stand</button> : <></> }
                {splitHand.length ? <button onClick={handleSplitStandClick}>Stand split hand</button> : <></> }
                </>}

                {splitButton()}


                {palyerStand ?<p>{winner}</p>:<p>{getHandValue(playerHand)}</p>}
                {palyerStand && splitHand.length ?<p>{splitWinner}</p>:<></>}
                {splitHand.length? getHandValue(splitHand) : <></>}

                {showDrawCardOrWager()}
            </div>

        </>
    )

}

export default Game;