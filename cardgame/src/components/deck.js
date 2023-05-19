const SUITS = ['♠', '♣', '♥', '♦']
const VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// merging two arrays of values and suits into one array

const CARDS = VALUES.reduce((result, value) => {
    for (let suit of SUITS) {
        result.push({
            value: value,
            suit: suit,
        })
    }
    return result
}, [])

export class Deck {
    constructor() {
        this.cards = CARDS
    }

    // shuffling pile of cards

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            //   const oldValue = this.cards[newIndex]
            //   this.cards[newIndex] = this.cards[i]
            //   this.cards[i] = oldValue
            ;[this.cards[i], this.cards[newIndex]] = [
                this.cards[newIndex],
                this.cards[i],
            ]
        }
        return this
    }

    // cutting the array until 3
    cut() {
        this.cards = this.cards.slice(0, 3)
        return this
    }

    // duplicating that cutted amount of cards

    double() {
        this.cards = [this.cards, ...this.cards].flat()
        return this
    }
}
