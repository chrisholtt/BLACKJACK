import React from 'react';
import Game from '../components/Game';
import {render, fireEvent, waitFor} from '@testing-library/react';
import { Router } from 'express';

describe('split', () => {
    
    let game

    beforeEach(() => {
        game = render(<Router><Game /></Router>)
    })

    it('should be able to give cards', function() {
        const playerHand = game.getByTestId("player-hand")
        const dealerHand = game.getByTestId("dealer-hand")
        const draw = game.getByTestId("draw-button")
        fireEvent.click(draw)
        expect(playerHand.length).toEqual(2)
        expect(dealerHand.length).toEqual(2)
    })
    it('should be able to give a card', function(){
        const playerHand = game.getByTestId("player-hand")
        const draw = game.getByTestId("draw-button")
        const drawOneCard = game.getByTestId("hit-button")
        fireEvent.click(draw)
        fireEvent.click(drawOneCard)
        expect(playerHand.length).toEqual(3)
    })
    it('should not give you a card before draw', function(){
        const playerHand = game.getByTestId("player-hand")
        const drawOneCard = game.getByTestId("hit-button")
        fireEvent.click(drawOneCard)
        expect(playerHand.length).toEqual(0)
    })
    it('should wait for player to stand before the dealer plays', function(){
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