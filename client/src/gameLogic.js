const getValue = (card) => {
    if (card === 'KING' || card === 'JACK' || card === 'QUEEN') {
        return 10
    } else if (card === 'ACE') {
        return 11
    } else {
        return card
    }
}

console.log(getValue(4))