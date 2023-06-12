import { Deck } from './deck';
import { renderApp } from '../index';

let countOpenedCards = 0;

export function renderGameField(difficulty = 1) {
    const gameField = document.querySelector('.game__field') as HTMLElement;
    const deck = new Deck();
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearTimeout(window.cardGame.flipTimeout);
    countOpenedCards = 0;

    window.cardGame.currentDeck = deck.prepare(difficulty).render(gameField);
    window.cardGame.flipTimeout = setTimeout(() => {
        deck.flipAllCards();
        addCardListener();
    }, 5000);
    countdown();
}

function addCardListener() {
    const cards = Array.from(document.body.querySelectorAll('.card'));

    for (let card of cards) {
        card.addEventListener('click', compareCards);
    }

    function compareCards(event: { currentTarget: any; }) {
        const card = event.currentTarget;
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');
        const resetCard = () => ({ value: '0', suit: '0' });

        face.classList.add('card__flip-face1');
        back.classList.add('card__flip-back1');

        (function checkConditions() {
            if (window.cardGame.firstCard.value === '0') {
                window.cardGame.firstCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                countOpenedCards++;
                card.removeEventListener('click', compareCards);
            } else {
                window.cardGame.secondCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                countOpenedCards++;
                card.removeEventListener('click', compareCards);
                // Условие проигрыша
                if (
                    window.cardGame.firstCard.value !==
                        window.cardGame.secondCard.value ||
                    window.cardGame.firstCard.suit !==
                        window.cardGame.secondCard.suit
                ) {
                    setTimeout(checkAndDisplayResult, 800, 'проиграли');
                }
                window.cardGame.firstCard = resetCard();
                window.cardGame.secondCard = resetCard();
            }
            // Условие выигрыша
            if (countOpenedCards === window.cardGame.currentDeck.cards.length) {
                setTimeout(checkAndDisplayResult, 800, 'выиграли');
            }
        })();
    }
}

function checkAndDisplayResult(result: string | undefined) {
    clearInterval(window.cardGame.timerInterval);
    countOpenedCards = 0;
    const timerValue = (document.querySelector('.game__digits') as HTMLElement)
        .textContent;
    window.cardGame.status = 'result';
    renderApp(window.cardGame.status, timerValue, result);
}

function countdown() {
    const timer = document.querySelector('.game__timer') as HTMLElement;
    const countdownEl = document.createElement('div') as HTMLDivElement;
    countdownEl.classList.add('game__countdown');
    countdownEl.textContent = '5';
    timer.after(countdownEl);

    window.cardGame.countdownInterval = setInterval(() => {
        if (Number(countdownEl.textContent) > 1) {
            countdownEl.textContent = String(
                Number(countdownEl.textContent) - 1
            );
        } else {
            clearInterval(window.cardGame.countdownInterval);
            countdownEl.textContent = 'Start';
            setTimeout(() => (countdownEl.textContent = ''), 1000);
            startTimer();
        }
    }, 1000);
}

function startTimer() {
    const timerDigits = document.querySelector('.game__digits') as HTMLElement;
    let time = 0;

    function setTime() {
        time += 1;
        const minutes = ('00' + Math.floor(time / 60)).slice(-2);
        const seconds = ('00' + (time % 60)).slice(-2);
        timerDigits.textContent = `${minutes}.${seconds}`;
    }

    window.cardGame.timerInterval = setInterval(setTime, 1000);
    setTimeout(clearInterval, 600000, window.cardGame.timerInterval);
}