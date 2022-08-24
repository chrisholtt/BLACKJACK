import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
const { blackjackGameLogic, getHandValue, blackjackCardRunnings } = require('../gameLogic')

const Game = ({user, updateMoney, wagerLost}) => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [splitHand, setSplitHand] = useState([])
    const [playerStand, setPlayerStand] = useState(false)
    const [splitStand, setSplitStand] = useState(false)
    const [winner, setWinner] = useState('')
    const [splitWinner, setSplitWinner] = useState('')
    const [wager, setWager] = useState(0)
    const [wagerMade, setWagerMade] = useState(false);
    const [inPlay, setInPlay] = useState(false)
    const [playAgain, setPlayAgain] = useState(false);
    const [dealerDone, setDealerDone] = useState(false);

    // Fetch all cards
    useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
            .then(res => res.json())
            .then(data => setDeckId(data.deck_id))
    }, [])

    // auto stops when player has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) === 21 && playerHand.length === 2) {
            console.log("Blackjack");
            updateMoney(wager * 1.5)
            setWager(0)
            setWagerMade(false)
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Player win BLACKJACK');
            setWinner('Player win BLACKJACK');
            setDealerDone(false);
        }
        if (getHandValue(playerHand) > 21) {
            console.log("player bust");
            setPlayerStand(true);
            wagerLost(wager);
            setWager(0);
            setWagerMade(false)
            setInPlay(false);
            setPlayAgain(true);
            findWinner();
    }}, [playerHand])

    useEffect(() => {
            if(playerStand && getHandValue(dealersHand) < 17){
                console.log('Dealer hits');
                dealerHit();
            } else {
                setDealerDone(true);
            }
    }, [playerStand])

    useEffect(() => {
        if(dealersHand.length >= 3) {
            if(playerStand && getHandValue(dealersHand) < 17){
                console.log('Dealer hits');
                dealerHit();
            } else if (playerStand){
                setDealerDone(true);
            }
        }
    }, [dealersHand])

    useEffect(() => {
        if(dealerDone) {
            console.log('finding winner');
            findWinner();
            setDealerDone(false);
        }
    }, [dealerDone])

    //auto stops if split hand has more than 21 points
    useEffect(() => {
        if (getHandValue(playerHand) > 21) {
            setSplitStand(true)
        }
    }, [splitHand])

    const handlePlayAgain = () => {
        setDealersHand([]);
        setPlayerHand([]);
        setSplitHand([]);
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
        if (playerHand[0].value === playerHand[1].value && playerHand[0].value === "Ace") {
            split()
        }
    }
    

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


    const handleWagerSubmit = () => {
        setWagerMade(true);
    }

    const handleDec = () => {
        if (wager === 0) {
            return
        }
        if (wager < 100) {
            setWager(prev => prev - 10)
        } else if (wager >= 100 && wager <= 900) {
            setWager(prev => prev - 100)
        } else if (wager >= 1000) {
            setWager(prev => prev - 1000)
        }
    }

    const handleInc = () => {
        if (wager < 100) {
            setWager(prev => prev + 10)
        } else if (wager >= 100 && wager <= 900) {
            setWager(prev => prev + 100)
        } else if (wager >= 1000) {
            setWager(prev => prev + 1000)
        }
    }

    const ShowDrawCardOrWager = () => {
        if(playAgain) {
            return (
                <button onClick={handlePlayAgain}>Play again</button>
            )
        } else if(!inPlay && !wagerMade) {
            return (
                <>
                    <button onClick={handleDec}>-</button>
                    <button onClick={handleWagerSubmit}>Wager</button> 
                    <button onClick={handleInc}>+</button>
                </>
            )
        } else if(!inPlay && wagerMade) {
            return (
                <button onClick={handleClick}>Draw card</button>
            )
        }
    }

    const PlayerHit = () => {
        if(inPlay){
            return (
                <button onClick={handleHitClick}>Hit</button>
            )
        }
    }

    const PlayerStand = () => {
        if(inPlay){
            return (
                <button onClick={handleStandClick}>Stand</button>
            )
        }
    }

    const Surrender = () => {
        if(playerHand.length === 2 && inPlay){
            return (
                <button onClick={handleSurrender}>Surrender</button>
            )
        }
    }

    const handleSurrender = () => {
        wagerLost(wager / 2)
        setWager(0)
        setInPlay(false);
        setPlayAgain(true);
    }

    const DoubleDown = () => {
        if(playerHand.length === 2 && inPlay){
            return (
                <button onClick={handleDoubleDown}>Double Down</button>
            )
        }
    }

    const handleDoubleDown = () => {
        const doubleWager = wager * 2;
        setWager(doubleWager)
        handleHitClick();
        setPlayerStand(true);
    }

    const findWinner = () => {
        if (blackjackGameLogic(dealersHand, playerHand) === "Player wins" || blackjackGameLogic(dealersHand, playerHand) === "Dealer bust") {
            updateMoney(wager * 2)
            setWager(0)
            setWagerMade(false)
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Player win');
            setWinner('Player win');
            setDealerDone(false);
        } else if (blackjackGameLogic(dealersHand, playerHand) === "Dealer wins" || blackjackGameLogic(dealersHand, playerHand) === "Player bust") {
            wagerLost(wager);
            setWager(0);
            setWagerMade(false)
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Dealer win');
            setWinner('Dealer win');
            setDealerDone(false);
        } else if (blackjackGameLogic(dealersHand, playerHand) === "Draw") {
            setWager(0);
            setWagerMade(false)
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Draw');
            setWinner('Draw');
            setDealerDone(false);
        }
    }

    const RunningTotals = () => {
        return (
            <p>{blackjackCardRunnings(dealersHand, playerHand)}</p>
        )
    }

    return (
        <>
            <div className="game-wrapper">
                <Link to="/">CLOSE</Link>

                <div className='top-half'>

                <div className="hand">
                    {dealerCardsNodes}
                </div>
            </div>
            
                <p> your wager is: {wager}</p>
                <hr />

                <div className="hand">
                    {playerCardsNodes}
                </div>

                <div className="hand">
                    {splitCardsNodes}
                </div>

                <PlayerHit />
                <PlayerStand />

                {playerStand && splitStand ? <p>Play another round?</p> : <>
                    {splitHand.length ? <button onClick={handleSplitHit}>Hit second hand</button> : <></>}
                    {splitHand.length ? <button onClick={handleSplitStandClick}>Stand split hand</button> : <></>}
                </>}

                <Surrender />

                <DoubleDown />

                {splitButton()}

                {playerStand && splitHand.length ?<p>{splitWinner}</p>:<></>}
                {splitHand.length? getHandValue(splitHand) : <></>}

                <p>{winner}</p>

                <RunningTotals />

                <ShowDrawCardOrWager />
                
            </div>
        </>
    )
}

export default Game;