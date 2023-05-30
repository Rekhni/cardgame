import spades from '../img/spades.svg';
import clubs from '../img/clubs.svg';
import diamonds from '../img/diamonds.svg';
import hearts from '../img/hearts.svg';

export class Deck {
    SUITS: string[];
    VALUES: string[];
    suitsBackground: { [key: string]: any };
    cardsNodeList: NodeList | null;
    cards: { value: string; suit: string; html: string }[];
    cardPresets: number[];
    constructor() {
        this.SUITS = ['♠', '♣', '♥', '♦'];
        this.VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suitsBackground = {
            '♠': spades,
            '♣': clubs,
            '♥': hearts,
            '♦': diamonds,
        };
        this.cardPresets = [3, 3, 6, 9];
        this.cardsNodeList = null;
        this.cards = this.VALUES.reduce(
            (
                result: { value: string; suit: string; html: string }[],
                value: string
            ) => {
                for (const suit of this.SUITS) {
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
            },
            []
        );
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

    cut(difficulty = 1) {
        this.cards = this.cards.slice(0, this.cardPresets[difficulty]);
        return this;
    }

    double() {
        this.cards = [this.cards, ...this.cards].flat();
        return this;
    }

    prepare(difficulty: number | undefined) {
        return this.shuffle().cut(difficulty).double().shuffle();
    }

    render(element = document.body) {
        for (const card of this.cards) {
            element.innerHTML = element.innerHTML += card.html;
        }
        this.cardsNodeList = document.querySelectorAll('.card');
        return this;
    }

    flipAllCards() {
        if (!this.cardsNodeList) return;
        this.cardsNodeList.forEach((element: Node | HTMLElement) => {
            const face = (element as HTMLElement).querySelector('.card__face');
            const back = (element as HTMLElement).querySelector('.card__back');

            (face as HTMLElement).classList.add('card__flip-face');
            (back as HTMLElement).classList.add('card__flip-back');
        });
        return this;
    }
}
