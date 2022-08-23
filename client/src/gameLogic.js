const getValue = (card) => {
    if (card.value === 'KING' || card.value === 'JACK' || card.value === 'QUEEN') {
        return 10
    } else if (card.value === 'ACE') {
        return 11
    } else {
        return Number(card.value)
    }
}


const getHandValue = (hand) => {
    const total = hand.reduce((prevValue, currentVal) => {
        return prevValue + getValue(currentVal)
    }, 0)
    return total
}

const blackjackGameLogic = (dealerHand, playerHand) => {
    const dealerTotal = getHandValue(dealerHand)
    const playerTotal = getHandValue(playerHand)
    if ((playerTotal > 0) && dealerTotal === playerTotal) {
        return "Draw"
    } else if (dealerTotal > 21) {
        return `Dealer bust`
    } else if ( playerTotal > 21) {
        return `Player bust`
    } else if (dealerTotal > playerTotal) {
        return "Dealer wins"
    } else if (dealerTotal < playerTotal) {
        return "Player wins"
    } else {
        return ` dealer: ${dealerTotal} player: ${playerTotal}`
    }
}

const blackjackCardRunnings = (dealerHand, playerHand) => {
    const dealerRunning = getHandValue(dealerHand);
    const playerRunning = getHandValue(playerHand);
    return `Dealer running total: ${dealerRunning} : Player running total: ${playerRunning}`;
}

const hand = [
    "ACE",
    "QUEEN",
    5
]


module.exports = {getValue, getHandValue, blackjackGameLogic, blackjackCardRunnings};
