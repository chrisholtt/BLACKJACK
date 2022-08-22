import React from 'react';
import Game from '../components/Game';
import { Router } from 'express';
import {render, fireEvent, waitFor} from '@testing-library/react';

describe("wager", () => {
    
    let game;


    beforeEach(() => {
        game = render(<Router><Game /></Router>)
    });

    it('should read the start wager as zero', () => {
        const wager = game.getByTestId("wager-amount")
        expect(wager.textContent).toEqual("Your wager is: 0")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addTenToWager = game.getByTestId("wager-buttons-10")
        fireEvent.click(addTenToWager)
        expect(wager.textContent).toEqual("Your wager is: 10")
    })
})