const getValue = (card) => {
    if (card === 'KING' || card === 'JACK' || card === 'QUEEN') {
        return 10
    } else if (card === 'ACE') {
        return 11
    } else {
        return card
    }
}


const getHandValue = (hand) => {
    const total = hand.reduce((prevValue, currentVal) => {
        return prevValue + getValue(currentVal)
    }, 0)
    return total
}

const hand = [
    "ACE",
    "QUEEN",
    5
]

console.log(getHandValue(hand))

module.exports = getValue;
module.exports = getHandValue;