const assert = require('assert')
const getValue = require('../gameLogic').getValue

describe('card', function() {
    let AceCard
    let KingCard
    let QueenCard
    let JackCard
    let EightCard
    let SevenCard

    beforeEach(function() {
        AceCard.value = "ACE"
        KingCard.value = "KING"
        QueenCard.value = "QUEEN"
        JackCard.value = "JACK"
        EightCard.value = 8
        SevenCard.value = 7
    })
    it('Should give back ace as 11', function() {
        assert.strictEqual(11 , getValue(AceCard))
    })
    it('Should give back king as 10', function() {
        assert.strictEqual(10, getValue(KingCard))
    })
    it('Should give back Queen as 10', function() {
        assert.strictEqual(10 , getValue(QueenCard))
    })
    it('Should give back Jack as 10', function() {
        assert.strictEqual(10 , getValue(JackCard))
    })
    it('Should give back eight as 8', function() {
        assert.strictEqual(8 , getValue(EightCard))
    })
    it('Should give back seven as 7', function() {
        assert.strictEqual(7 , getValue(SevenCard))
    })
})