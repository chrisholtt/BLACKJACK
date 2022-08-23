import React from 'react';
import Game from '../components/Game';
import {render, fireEvent, waitFor} from '@testing-library/react';

describe("wager", () => {
    
    let game;
    let user;


    beforeEach(() => {
        game = render(<Game user={user={money: 100}} wagerMoney={() => {}}/>)
    });
    
    it('should read the start wager as zero', () => {
        const wager = game.getByTestId("wager-amount")
        expect(wager.textContent).toEqual("Your wager is: 0")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addOneToWager = game.getByTestId("wager-buttons-1")
        fireEvent.click(addOneToWager)
        expect(wager.textContent).toEqual("Your wager is: 1")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addTwoToWager = game.getByTestId("wager-buttons-2")
        fireEvent.click(addTwoToWager)
        expect(wager.textContent).toEqual("Your wager is: 2")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addFiveToWager = game.getByTestId("wager-buttons-5")
        fireEvent.click(addFiveToWager)
        expect(wager.textContent).toEqual("Your wager is: 5")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addTenToWager = game.getByTestId("wager-buttons-10")
        fireEvent.click(addTenToWager)
        expect(wager.textContent).toEqual("Your wager is: 10")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addTwentyToWager = game.getByTestId("wager-buttons-20")
        fireEvent.click(addTwentyToWager)
        expect(wager.textContent).toEqual("Your wager is: 20")
    })
    it('should be able to add to wager amout', () => {
        const wager = game.getByTestId("wager-amount")
        const addFiftyToWager = game.getByTestId("wager-buttons-50")
        fireEvent.click(addFiftyToWager)
        expect(wager.textContent).toEqual("Your wager is: 50")
    })
    it('shoulf be able to wager two amouts', () => {
        const wager = game.getByTestId("wager-amount")
        const addTwentyToWager = game.getByTestId("wager-buttons-20")
        fireEvent.click(addTwentyToWager)
        fireEvent.click(addTwentyToWager)
        expect(wager.textContent).toEqual("Your wager is: 40")
    })
})