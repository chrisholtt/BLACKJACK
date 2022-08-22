const assert = require('assert')
const {getHandValue} = require('../gameLogic')

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
    let hand4 = []
    let hand5 = []
    let hand6 = []
    let hand7 = []

    beforeEach(function() {
        AceCard.value = "ACE"
        KingCard.value = "KING"
        QueenCard.value = "QUEEN"
        JackCard.value = "JACK"
        EightCard.value = 8
        SevenCard.value = 7
        hand1 = [AceCard, KingCard]
        hand2 = [AceCard, EightCard, SevenCard]
        hand3 = [EightCard, EightCard, SevenCard]
        hand4 = [KingCard, JackCard]
        hand5 = [SevenCard, SevenCard]
        hand6 = [AceCard, QueenCard]
        hand7 = [AceCard, JackCard]

    })
    it('should be equal to 21', function(){
        assert.deepStrictEqual(21 , getHandValue(hand1))
    })
    it('should be equal to 26', function(){
        assert.deepStrictEqual(26 , getHandValue(hand2))
    })
    it('should be equal to 23', function(){
        assert.deepStrictEqual(23 , getHandValue(hand3))
    })
    it('should be equal to 20', function(){
        assert.deepStrictEqual(20 , getHandValue(hand4))
    })
    it('should be equal to 14', function(){
        assert.deepStrictEqual(14, getHandValue(hand5))
    })
    it('should be equal to 21', function(){
        assert.deepStrictEqual(21, getHandValue(hand6))
    })
    it('should be equal to 21', function(){
        assert.deepStrictEqual(21, getHandValue(hand7))
    })

    })