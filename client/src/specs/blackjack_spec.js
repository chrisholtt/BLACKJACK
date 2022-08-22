const assert = require('assert')
const {blackjackGameLogic} = require('../gameLogic')


describe('game', function() {

    let dealerHand1 = []
    let dealerHand2 = []
    let dealerHand3 = []
    let dealerHand4 = []
    let playerHand1 = []
    let playerHand2 = []
    let playerHand3 = []
    let playerHand4 = []
    let AceCard
    let KingCard
    let QueenCard
    let JackCard
    let EightCard
    let SevenCard


    beforeEach(function(){
        AceCard.value = "ACE"
        KingCard.value = "KING"
        QueenCard.value = "QUEEN"
        JackCard.value = "JACK"
        EightCard.value = 8
        SevenCard.value = 7
        dealerHand1 = [AceCard, QueenCard]
        dealerHand2 = [EightCard, AceCard]
        dealerHand3 = [QueenCard, SevenCard]
        dealerHand4 = [KingCard, JackCard, SevenCard]
        playerHand1 = [AceCard, JackCard]
        playerHand2 = [JackCard, QueenCard]
        playerHand3 = [EightCard, SevenCard]
        playerHand4 = [AceCard, EightCard, SevenCard]
    })
    it('should return draw', function(){
        assert.strictEqual("Draw", blackjackGameLogic(dealerHand1, playerHand1))
    })
    it('should return dealer wins', function(){
        assert.strictEqual("Dealer wins", blackjackGameLogic(dealerHand1, playerHand2))
    })
    it('should return player wins', function(){
        assert.strictEqual("Player wins", blackjackGameLogic(dealerHand2, playerHand1))
    })
    it('should return player bust', function(){
        assert.strictEqual("Player bust with 26", blackjackGameLogic(dealerHand2, playerHand4))
    })
    it('should return dealer bust', function(){
        assert.strictEqual("Dealer bust with 27", blackjackGameLogic(dealerHand4, playerHand2))
    })
    it('should return dealer wins', function(){
        assert.strictEqual("Dealer wins", blackjackGameLogic(dealerHand2, playerHand3))
    })
    it('should return player wins', function(){
        assert.strictEqual("Player wins", blackjackGameLogic(dealerHand3, playerHand2))
    })
})