// import * as assert from 'assert';
// const assert = require("assert").strict;

const { it, describe, expect } = require('@jest/globals');
import { Deck } from '../src/components/deck.ts';

describe('Deck', () => {
    describe('cards', () => {
        it('should have 36 cards', () => {
            // Prepare
            const expected = 36;
            // Action
            const deck = new Deck();
            const result = deck.cards.length;
            // Compare
            expect(result).toBe(expected);
        });

        it('should contain 9 cards of each suit', () => {
            // Prepare
            const cardsOfSuit = 9;
            const suits = ['♠', '♣', '♥', '♦'];
            // Action
            const deck = new Deck();
            for (let suit of suits) {
                const result = deck.cards.filter(
                    (card) => card.suit === suit
                ).length;
                // Compare
                expect(result).toBe(cardsOfSuit);
            }
        });
    });

    describe('shuffle', () => {
        it('should not equal itself(it will be failed 1/36)', () => {
            // Prepare
            const controlDeck = new Deck();
            // Action
            const deck = new Deck();
            const result = deck.shuffle();
            // Compare
            expect(controlDeck.cards[0]).not.toEqual(result.cards[0]);
        });
    });

    describe('cut', () => {
        it('should have the required length ', () => {
            // Prepare
            let requiredLength = 1;

            // Action
            for (requiredLength; requiredLength < 4; requiredLength++) {
                const deck = new Deck();
                const result = deck.cut(requiredLength);
                // Compare
                expect(result.cards).toHaveLength(requiredLength * 3);
            }
        });
    });

    describe('double', () => {
        it('should have twice the number of cards', () => {
            // Prepare
            const deck = new Deck();
            const expected = deck.cards.length * 2;
            // Action

            const result = deck.double();
            // Compare
            expect(result.cards).toHaveLength(expected);
        });
    });
});
