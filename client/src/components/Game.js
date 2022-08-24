import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const { blackjackGameLogic, getHandValue, blackjackCardRunnings } = require('../gameLogic')

const Game = ({ user, updateMoney, wagerMoney, wagerLost }) => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [splitHand, setSplitHand] = useState([])
    const [playerStand, setPlayerStand] = useState(false)
    const [splitStand, setSplitStand] = useState(false)
    const [winner, setWinner] = useState('')
    const [splitWinner, setSplitWinner] = useState('')
    const [wager, setWager] = useState(0)
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
        if (getHandValue(playerHand) > 21) {
            console.log("player bust");
            setPlayerStand(true);
            wagerLost(wager);
            setWager(0);
            setInPlay(false);
            setPlayAgain(true);
            findWinner();
        }
    }, [playerHand])

    useEffect(() => {
        if (playerStand && getHandValue(dealersHand) < 17) {
            console.log('Dealer hits');
            dealerHit();
        } else {
            setDealerDone(true);
        }
    }, [playerStand])

    useEffect(() => {
        if (dealersHand.length >= 3) {
            if (playerStand && getHandValue(dealersHand) < 17) {
                console.log('Dealer hits');
                dealerHit();
            } else if (playerStand) {
                setDealerDone(true);
            }
        }
    }, [dealersHand])

    useEffect(() => {
        if (dealerDone) {
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

    // useEffect(() => {
    //     // setWinner(blackjackGameLogic(dealersHand, playerHand))
    //     // setSplitWinner(blackjackGameLogic(dealersHand, splitHand))
    //     // console.log(winner);

    // }, [playerHand])

    // separets the dealer's cards to show
    const dealerCardsNodes = dealersHand.map((card, index) => {
        return (
            <img className='card' key={index} src={card.image} alt="playing_card" />
        )
    })

    // separets the player's cards to show
    const playerCardsNodes = playerHand.map((card, index) => {
        return (
            <Draggable>
                <img className='card' key={index} src={card.image} alt="playing_card" />
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
        // if (getHandValue(playerHand) > 21) {
        //     // setPlayerStand(true)
        //     // console.log("player bust");
        //     // findWinner();
        // }
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

        console.log('Player stand');
        // if (getHandValue(dealersHand < 17)){
        //     dealerHit();
        // }
        // console.log('Dealer done');
        // findWinner();
        // console.log('Found winner');
        // do {
        //     dealerHit();
        //     console.log(getHandValue(dealersHand));
        // }
        // while (getHandValue(dealersHand) < 17);
        // if (getHandValue(dealersHand) < 17) {
        //     dealerHit();
        // } else {
        //     findWinner();
        // }
        // if (blackjackGameLogic(dealersHand, playerHand) === "Player wins" || blackjackGameLogic(dealersHand, playerHand) === "Dealer bust") {
        //     updateMoney(wager * 2)
        //     setWager(0)
        //     setInPlay(false);
        //     setPlayAgain(true);
        // }
        //  else if (blackjackGameLogic(dealersHand, playerHand) === "Dealer wins") {
        //     wagerLost(wager);
        //     setWager(0);
        //     setInPlay(false);
        //     setPlayAgain(true);
        // }
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
                return <Button color='success' variant="contained" onClick={split}>Split?</Button>
            }
        }
    }


    // shows the split hand
    const splitCardsNodes = splitHand.map((card, index) => {
        return (
            <Draggable>
                <img key={index} src={card.image} alt="playing_card" className='card' />
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
        if (user.money > 0) {
            // const newAmount = user.money - 1
            const newWage = wager + 1
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }
    const handlwage2 = () => {
        if (user.money > 1) {
            // const newAmount = user.money - 2
            const newWage = wager + 2
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }
    const handlwage5 = () => {
        if (user.money > 4) {
            const newAmount = user.money - 5
            const newWage = wager + 5
            wagerMoney(newAmount)
            setWager(newWage)
        }
    }

    const handlwage10 = () => {
        if (user.money > 9) {
            // const newAmount = user.money - 10
            const newWage = wager + 10
            // wagerMoney(newAmount)
            setWager(newWage)
        }
    }

    const handlwage20 = () => {
        if (user.money >= 20) {
            // const newAmount = user.money - 20
            const newWage = wager + 20
            // wagerMoney(newAmount)
            setWager(newWage)
            setInPlay(false);
        }
    }
    const handlwage50 = () => {
        if (user.money >= 50) {
            // const newAmount = user.money - 50
            const newWage = wager + 50
            // wagerMoney(newAmount)
            setWager(newWage)
            setInPlay(false);
        }
    }

    const ShowDrawCardOrWager = () => {
        if (playAgain) {
            return (
                <button onClick={handlePlayAgain}>Play again</button>
            )
        } else if (!inPlay && wager === 0) {
            return (
                <button onClick={handlwage10}>Wager</button>
            )
        } else if (!inPlay && wager > 0) {
            return (
                <button onClick={handleClick}>Draw card</button>
            )
        }
    }

    const PlayerHit = () => {
        if (inPlay) {
            return (
                <Button color='success' variant="contained" onClick={handleHitClick}>HIT</Button>
            )
        }
    }

    const PlayerStand = () => {
        if (inPlay) {
            return (
                <Button color='success' variant="contained" onClick={handleStandClick}>STAND</Button>
            )
        }
    }

    const Surrender = () => {
        if (playerHand.length === 2 && inPlay) {
            return (
                <Button color='success' variant="contained" onClick={handleSurrender}>Surrender</Button>
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
        if (playerHand.length === 2 && inPlay) {
            return (
                <Button color='success' variant="contained" onClick={handleDoubleDown}>DOUBLE DOWN</Button>
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
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Player win');
            setWinner('Player win');
            setDealerDone(false);
        }
        else if (blackjackGameLogic(dealersHand, playerHand) === "Dealer wins" || blackjackGameLogic(dealersHand, playerHand) === "Player bust") {
            wagerLost(wager);
            setWager(0);
            setInPlay(false);
            setPlayAgain(true);
            setPlayerStand(false);
            console.log('Dealer win');
            setWinner('Dealer win');
            setDealerDone(false);
        } else if (blackjackGameLogic(dealersHand, playerHand) === "Draw") {
            setWager(0);
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
                <img src="/static/poker-table.jpg" alt="" className='game-table' />
                <div className='top-half'>
                    <div className="hand">
                        {dealerCardsNodes}
                    </div>
                </div>

                <p> your wager is: {wager}</p>

                <div className="top-half">
                    <div className="hand">
                        {playerCardsNodes}
                    </div>

                    {splitHand.length ? <div className='split-divider'></div> : <></>}

                    <div className="hand">
                        {splitCardsNodes}
                    </div>
                </div>


                {playerStand && splitStand ? <p>Play another round?</p> : <>
                    {/* {inPlay ? <button onClick={handleHitClick}>Hit</button> : <></>} */}
                    <ButtonGroup>
                        {splitHand.length ? <Button color='success' variant="contained" onClick={handleSplitHit}>Hit second hand</Button> : <></>}
                        {/* {inPlay ? <button onClick={handleStandClick}>Stand</button> : <></>} */}
                        {splitHand.length ? <Button color='success' variant="contained" onClick={handleSplitStandClick}>Stand split hand</Button> : <></>}
                    </ButtonGroup>
                </>}

                <ButtonGroup>
                    <PlayerHit />
                    <PlayerStand />
                    <Surrender />
                    <DoubleDown />
                    {splitButton()}
                </ButtonGroup>




                <div className="game-text-container">
                    {playerStand && splitHand.length ? <p>{splitWinner}</p> : <></>}
                    {splitHand.length ? getHandValue(splitHand) : <></>}

                    <p>{winner}</p>
                    <RunningTotals />
                    <ShowDrawCardOrWager />
                </div>


                <Link to="/" className='leave-game'>LEAVE GAME</Link>
            </div>
        </>
    )
}

export default Game;