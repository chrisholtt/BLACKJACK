const assert = require('assert')
const {checkIfBustWithAce} = require('../gameLogic')

describe('card', function() {
    let AceCard
    let KingCard
    let QueenCard
    let JackCard
    let EightCard
    let SevenCard
    let hand1 = []
    let hand2 = []
    let hand3 = []

    beforeEach(function() {
        AceCard = {value: "ACE"}
        KingCard = {value: "KING"}
        QueenCard = {value: "QUEEN"}
        JackCard = {value: "JACK"}
        EightCard = {value: 8}
        SevenCard = {value: 7}
        hand1 = [AceCard, KingCard]
        hand2 = [AceCard, QueenCard, SevenCard]
        hand3 = [EightCard, EightCard, SevenCard]
    })
    it('should give back less than 21', function() {
        assert.deepStrictEqual(18, checkIfBustWithAce(hand2))
    })
})
