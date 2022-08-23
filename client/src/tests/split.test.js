import React from 'react';
import Game from '../components/Game';
import {render, fireEvent, waitFor} from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('split', () => {
    
    let game

    beforeEach(() => {
        game = render(<Game />)
    })

    it('should start with empty hands', function() {
        const playerHand = game.getByTestId("player-hand")
        const dealerHand = game.getByTestId("dealer-hand")
        expect(playerHand).toEqual("hello")
    })
    it('should be able to give cards', function() {
        const playerHand = game.getByTestId("player-hand")
        const dealerHand = game.getByTestId("dealer-hand")
        const draw = game.getByTestId("draw-button")
        fireEvent.click(draw)
        console.log(game.getByTestId("player-hand"));
        expect(playerHand.length).toEqual(2)
        expect(dealerHand.length).toEqual(2)
    })
    xit('should be able to give a card', function(){
        const playerHand = game.getByTestId("player-hand")
        const draw = game.getByTestId("draw-button")
        const drawOneCard = game.getByTestId("hit-button")
        fireEvent.click(draw)
        fireEvent.click(drawOneCard)
        expect(playerHand.length).toEqual(3)
    })
    xit('should not give you a card before draw', function(){
        const playerHand = game.getByTestId("player-hand")
        const drawOneCard = game.getByTestId("hit-button")
        fireEvent.click(drawOneCard)
        expect(playerHand.length).toEqual(0)
    })
    xit('should wait for player to stand before the dealer plays', function(){
        const fiveCard = {value: 5}
        const sixCard = {value: 6}
        const playerHand = game.getByTestId("player-hand")
        const dealerHand = [fiveCard, sixCard]
        const draw = game.getByTestId("draw-button")
        const stand = game.getByTestId("stand-button")
        fireEvent.click(draw)
        expect(playerHand.length).toEqual(2)
        expect(dealerHand.length).toEqual(2)
        fireEvent.click(stand)
    })
})