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

const checkIfBustWithAce = (hand) => {
    let total = getHandValue(hand)
    if (total > 21) {
        for (let card of hand) {
            if (card.value === "ACE") {
                let newTotal
                return newTotal = total - 10
            }
        }
    }
    return total
}

const aceOfDealer = (hand) => {
    let total = getHandValue(hand)
    hand.map((card, index) => {
        if (card[index] !== 1 && card.value === "ACE"){
            let newTotal
            return newTotal = total - 10
        }
    })
    return total
}

const blackjackGameLogic = (dealerHand, playerHand) => {
    const dealerTotal = aceOfDealer(dealerHand)
    const playerTotal = checkIfBustWithAce(playerHand)
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

const blackjackCardRunnings = (playerHand) => {
    const playerRunning = checkIfBustWithAce(playerHand);
    return `Player running total: ${playerRunning}`;
}

module.exports = {getValue, blackjackGameLogic, checkIfBustWithAce, aceOfDealer, blackjackCardRunnings};
