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

    beforeEach(function() {
        AceCard = "ACE"
        KingCard = "KING"
        QueenCard = "QUEEN"
        JackCard = "JACK"
        EightCard = 8
        SevenCard = 7
        hand1 = [AceCard, KingCard]
        hand2 = [AceCard, EightCard, SevenCard]
        hand3 = [EightCard, EightCard, SevenCard]
        hand4 = [KingCard, JackCard]
        hand5 = [SevenCard, SevenCard]
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

    })