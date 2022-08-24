import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import Draggable from "react-draggable"
import { Link } from "react-router-dom";
const { blackjackGameLogic, blackjackCardRunnings, aceOfDealer, checkIfBustWithAce } = require('../gameLogic')


const Game = ({ user, updateMoney, wagerMoney, wagerLost }) => {
    const [deckId, setDeckId] = useState(null)
    const [dealersHand, setDealersHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [splitHand, setSplitHand] = useState([])
    const [playerStand, setPlayerStand] = useState(false)
    const [splitStand, setSplitStand] = useState(true)
    const [winner, setWinner] = useState('')
    const [splitWinner, setSplitWinner] = useState('')
    const [wager, setWager] = useState(0)
    const [splitWager, setSplitWager] = useState(0)
    const [wagerMade, setWagerMade] = useState(false);
    const [inPlay, setInPlay] = useState(false)
    const [splitInPlay, setSplitInPlay] = useState(false)
    const [playAgain, setPlayAgain] = useState(false);
    const [splitPlayAgain, setSplitPlayAgain] = useState(true)
    const [dealerDone, setDealerDone] = useState(false);
    const [gameEnd, setGameEnd] = useState(true)

    // Fetch all cards
    useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
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
                setSplitHand([])
                setPlayerStand(false)
                setInPlay(true);
                setDealerDone(false)
                setGameEnd(false)
                splitButton()
            })
        if (playerHand[0].value === playerHand[1].value && playerHand[0].value === "Ace") {
            split()
        }
    }

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

    // auto stops when player has more than 21 points
    useEffect(() => {
        if (checkIfBustWithAce(playerHand) === 21 && playerHand.length === 2) {
            if (splitInPlay) {
                updateMoney(wager * 1.5)
                setWager(0)
                setInPlay(false);
                setPlayAgain(true);
                setPlayerStand(false);
                setWinner('Player win BLACKJACK');
            } else {
                updateMoney(wager * 1.5)
                setWager(0)
                setInPlay(false);
                setPlayAgain(true);
                setPlayerStand(false);
                setWinner('Player win BLACKJACK');
                setDealerDone(false);
                setGameEnd(true)
            }
        }
        if (checkIfBustWithAce(playerHand) > 21) {
            if (splitInPlay) {
                setPlayerStand(true);
                wagerLost(wager);
                setWager(0);
                setInPlay(false);
                setPlayAgain(true);
            } else {
                setPlayerStand(true);
                wagerLost(wager);
                setWager(0);
                setInPlay(false);
                setPlayAgain(true);
                findWinner();
                setGameEnd(true)
            }
        }
    }, [playerHand])

    useEffect(() => {
        if (checkIfBustWithAce(splitHand) === 21 && splitHand.length === 2) {
            updateMoney(splitWager * 1.5)
            setWager(0)
            setSplitStand(true)
            setSplitWinner('Split hand wins BLACKJACK')
            setDealerDone(true)
            setGameEnd(true)
        }
        if (checkIfBustWithAce(splitHand) > 21) {
            setSplitStand(true)
            wagerLost(splitWager)
            setSplitWager(0)
            findSplitWinner()
            setGameEnd(true)
        }
    }, [splitHand])

    useEffect(() => {
        if (playerStand && splitStand && aceOfDealer(dealersHand) < 17) {
            dealerHit();
        } else if (playerStand && splitStand) {
            setDealerDone(true);
            setGameEnd(true)
        }
    }, [playerStand, splitStand])
    
    useEffect(() => {
        if (dealersHand.length >= 3) {
            if (playerStand && aceOfDealer(dealersHand) < 17) {
                dealerHit();
            } else if (playerStand) {
                setDealerDone(true);
                setGameEnd(true)
            }
        }
    }, [dealersHand])


    useEffect(() => {

        if (dealerDone) {
            if (playerStand && splitStand && splitHand.length) {
                findWinner();
                findSplitWinner();
            } else if (playerStand && splitStand && !splitHand.length) {
                findWinner()
            } else {
                findWinner();
            }
        }
    }, [dealerDone])


    const handlePlayAgain = () => {
        setDealersHand([]);
        setPlayerHand([]);
        setSplitHand([]);
        setPlayAgain(false);
        setWinner('');
    }




    const DealerCardNodes = () => {
        if (dealersHand.length == 2 && !gameEnd) {
            return (
                <>
                    <img className='card' src={dealersHand[0].image} alt="playing_card" />
                    <img className='card' src="/static/reverse.png" alt="playing_card" />
                </>
            )
        } else {
            const dealerCardsNodes = dealersHand.map((card, index) => {
                return (
                    <img className='card' key={index} src={card.image} alt="playing_card" />
                )
            }
            )
            return dealerCardsNodes
        }
    }

    // separets the player's cards to show
    const playerCardsNodes = playerHand.map((card, index) => {
        return (
            <Draggable>
                <img className='card' key={index} src={card.image} alt="playing_card" />
            </Draggable>
        )
    })



    // set player stand, allows dealer to play after, payout acording to who won
    const handleStandClick = () => {
        setPlayerStand(true);
        setInPlay(false)
    }
    const handleSplitStandClick = () => {
        setSplitStand(true);
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
                setSplitWager(wager)
                setSplitInPlay(true)
                setSplitStand(false)
                setSplitPlayAgain(false)
            })
    }


    // the split button
    const splitButton = () => {
        if (playerHand.length === 2 && !splitHand.length && inPlay) {
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
        if (playAgain && splitPlayAgain) {
            return (
                <button onClick={handlePlayAgain}>Play again</button>
            )
        } else if (!inPlay && !wagerMade) {
            return (
                <>
                    <button onClick={handleDec}>-</button>
                    <button onClick={handleWagerSubmit}>Wager</button>
                    <button onClick={handleInc}>+</button>
                </>
            )
        } else if (!inPlay && wagerMade) {
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
        if (playerHand.length === 2 && inPlay && !splitInPlay) {
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
        if (playerHand.length === 2 && inPlay && !splitInPlay) {
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
            setWagerMade(false)
            if (splitInPlay) {
                setPlayAgain(true);
                setInPlay(false)
                console.log("find winner resetting on split hand with split hand");
                setWinner('Player win');
            } else {
                setInPlay(false);
                setPlayAgain(true);
                setPlayerStand(false);
                console.log("find winner resetting on split hand without split hand");
                setWinner('Player win');
                setDealerDone(false);
            }
        } else if (blackjackGameLogic(dealersHand, playerHand) === "Dealer wins" || blackjackGameLogic(dealersHand, playerHand) === "Player bust") {
            wagerLost(wager);
            setWager(0);
            setWagerMade(false)
            if (splitInPlay){
                setPlayAgain(true);
                setInPlay(false)
                console.log("dealer wins and resetting split hand wiht split hand");
                setWinner('Dealer win');
            } else {
                setInPlay(false);
                setPlayAgain(true);
                console.log("dealer wins and resetting split hand wihtout split hand");
                setWinner('Dealer win');
                setDealerDone(false);
            }
        } else if (blackjackGameLogic(dealersHand, playerHand) === "Draw") {
            setWager(0);
            setWagerMade(false)
            if (splitInPlay) {
                setPlayAgain(true);
                setInPlay(false)
                console.log("resetting on draw with split hand");
                setWinner('Draw');
            } else {
                setInPlay(false);
                setPlayAgain(true);
                setPlayerStand(false);
                console.log("resetting on draw without split hand");
                setWinner('Draw');
                setDealerDone(false);
            }
        }
    }

    // check what does need to be changed
    const findSplitWinner = () => {
        if (blackjackGameLogic(dealersHand, splitHand) === "Player wins" || blackjackGameLogic(dealersHand, splitHand) === "Dealer bust") {
            updateMoney(splitWager * 2)
            setSplitWager(0)
            setSplitPlayAgain(true)
            setSplitInPlay(false)
            setSplitWinner('Won with split hand')
            setDealerDone(false)
        } else if (blackjackGameLogic(dealersHand, splitHand) === "Dealer wins" || blackjackGameLogic(dealersHand, splitHand) === "Player bust") {
            wagerLost(splitWager)
            setSplitWager(0)
            setSplitInPlay(false)
            setSplitPlayAgain(true)
            setSplitWinner('Dealer wins against split hand')
            setDealerDone(false)
        } else if (blackjackGameLogic(dealersHand, splitHand) === "Draw") {
            setSplitWager(0)
            setSplitPlayAgain(true)
            setSplitInPlay(false)
            setSplitWinner('Draw')
            setDealerDone(false)
        }
    }

    const RunningTotals = () => {
        return (
            <p>{blackjackCardRunnings(dealersHand, playerHand)}</p>
        )
    }

    const SplitRunningTotal = () => {
        return (
            <p>{blackjackCardRunnings(dealersHand, splitHand)}</p>
        )
    }

    const forceDouble = () => {
        setSplitStand(false)
        setInPlay(true);
        setSplitInPlay(false)
        setDealersHand([{
            "code": "QH",
            "image": "https://deckofcardsapi.com/static/img/QH.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/QH.svg",
                "png": "https://deckofcardsapi.com/static/img/QH.png"
            },
            "value": "QUEEN",
            "suit": "HEARTS"
        },
        {
            "code": "6C",
            "image": "https://deckofcardsapi.com/static/img/6C.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6C.svg",
                "png": "https://deckofcardsapi.com/static/img/6C.png"
            },
            "value": "6",
            "suit": "CLUBS"
        }])
        setPlayerHand([{
            "code": "5H",
            "image": "https://deckofcardsapi.com/static/img/5H.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5H.svg",
                "png": "https://deckofcardsapi.com/static/img/5H.png"
            },
            "value": "5",
            "suit": "HEARTS"
        },
        {
            "code": "5C",
            "image": "https://deckofcardsapi.com/static/img/5C.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5C.svg",
                "png": "https://deckofcardsapi.com/static/img/5C.png"
            },
            "value": "5",
            "suit": "CLUBS"
        }])
    }

    return (
        <>
            <div className="game-wrapper">
                <img src="/static/poker-table.jpg" alt="" className='game-table' />
                <div className='top-half'>
                    <div className="hand">
                        <DealerCardNodes />
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


                {playerStand && splitStand ? <p>Play another round?</p> : <> </>}

                <ButtonGroup>
                    {splitHand.length > 1 && playerStand && !splitStand ? <button onClick={handleSplitHit}>Hit second hand</button> : <></>}
                    {splitHand.length > 1 && playerStand && !splitStand ? <button onClick={handleSplitStandClick}>Stand split hand</button> : <></>}
                </ButtonGroup>


                <ButtonGroup>
                    <PlayerHit />
                    <PlayerStand />
                    <Surrender />
                    <DoubleDown />
                    {splitButton()}
                </ButtonGroup>




                <div className="game-text-container">
                    {playerStand && splitHand.length ? <p>{splitWinner}</p> : <></>}
                    {splitHand.length ? checkIfBustWithAce(splitHand) : <></>}

                    <p>{winner}</p>
                    <RunningTotals />
                    <ShowDrawCardOrWager />
                </div>


                {splitHand.length ? <SplitRunningTotal /> : <></>}


                {user.name === "Test" || user.name === "test" ? <button onClick={forceDouble} >Force double!! For show purpose only</button> : <></>}
                

                <Link to="/" className='leave-game'>LEAVE GAME</Link>

            </div>
        </>
    )
}

export default Game;