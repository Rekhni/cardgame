import spades from '../img/spades.svg';
import clubs from '../img/clubs.svg';
import diamonds from '../img/diamonds.svg';
import hearts from '../img/hearts.svg';

// const suitsBackground = {
//     '♠': spades,
//     '♣': clubs,
//     '♥': hearts,
//     '♦': diamonds,
// };

export class Deck {
    constructor() {
        this.SUITS = ['♠', '♣', '♥', '♦'];
        this.VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suitsBackground = {
            '♠': spades,
            '♣': clubs,
            '♥': hearts,
            '♦': diamonds,
        };
        this.cards = this.VALUES.reduce((result, value) => {
            for (let suit of this.SUITS) {
                result.push({
                    value: value,
                    suit: suit,
                    html: `
                    <div data-value=${value} data-suit=${suit} class="card" >
                        <div class="card__back"></div>
                        <div class="card__face" style="background: url('${this.suitsBackground[suit]}') center center no-repeat, rgb(255, 255, 255);">
                            <div class="card__top">    
                                <div class="card__value">${value}
                                </div>
                                <img class="card__suit" src="${this.suitsBackground[suit]}" alt="suit">
                            </div>
                            <div class="card__bottom">    
                                <div class="card__value">${value}
                                </div>
                                <img class="card__suit" src="${this.suitsBackground[suit]}" alt="suit">
                            </div>
                        </div>
                    </div>
                    `,
                });
            }
            return result;
        }, []);
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));

            [this.cards[i], this.cards[newIndex]] = [
                this.cards[newIndex],
                this.cards[i],
            ];
        }
        return this;
    }

    cut(length = 3) {
        this.cards = this.cards.slice(0, length);
        return this;
    }

    double() {
        this.cards = [this.cards, ...this.cards].flat();
        return this;
    }

    render(element = document.body) {
        for (let card of this.cards) {
            element.innerHTML = element.innerHTML += card.html;
        }
        return this;
    }
}
