import React from 'react';
import Game from '../components/Game';
import {render, fireEvent, waitFor} from '@testing-library/react';

describe('split', () => {
    
    let game

    beforeEach(() => {
        game = render(<Game />)
    })

    xit('should be able to give cards', function() {
        const playerHand = game.getByTestId("player-hand")
        const dealerHand = game.getByTestId("dealer-hand")
        const draw = game.getByTestId("draw-button")
        console.log(playerHand);
        fireEvent.click(draw)
        expect(playerHand.length).toEqual(2)
        expect(dealerHand.length).toEqual(2)
    })
    xit('should be able to give a carde', function(){

    })
})