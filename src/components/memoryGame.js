import { Deck } from './deck.js';
import { renderApp } from '../index.js';

let countOpenedCards = 0;

export function renderGameField(difficulty = 1) {
    const gameField = document.querySelector('.game__field');
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearTimeout(window.cardGame.flipTimeout);

    const deck = new Deck();
    const cardPresets = [3, 3, 6, 9];
    window.cardGame.currentDeck = deck
        .shuffle()
        .cut(cardPresets[+difficulty])
        .double()
        .shuffle()
        .render(gameField);
    console.log(deck);
    window.cardGame.flipTimeout = setTimeout(() => {
        flipCards();
        addCardListener();
    }, 5000);
    countdown();
}

function addCardListener() {
    const cards = document.body.querySelectorAll('.card');
    const resetCard = () => {
        return { value: 0, suit: 0 };
    };

    for (let card of cards) {
        card.addEventListener('click', compareCards);
    }

    function compareCards(event) {
        const card = event.srcElement.closest('.card');
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');

        face.classList.add('card__flip-face1');
        back.classList.add('card__flip-back1');

        setTimeout(checkConditions, 800);

        function checkConditions() {
            if (!window.cardGame.firstCard.value) {
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
                    checkAndDisplayResult('проиграли');
                }
                window.cardGame.firstCard = resetCard();
                window.cardGame.secondCard = resetCard();
            }
            // Условие выигрыша
            if (countOpenedCards === window.cardGame.currentDeck.cards.length) {
                checkAndDisplayResult('выиграли');
            }
        }
    }
}

function checkAndDisplayResult(result) {
    clearInterval(window.cardGame.timerInterval);
    countOpenedCards = 0;
    const timerValue = document.querySelector('.game__digits').textContent;
    window.cardGame.status = 'result';
    renderApp(window.cardGame.status, timerValue, result);
}

function flipCards() {
    const cards = document.body.querySelectorAll('.card');

    for (let card of cards) {
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');

        face.classList.add('card__flip-face');
        back.classList.add('card__flip-back');
    }
}

function countdown() {
    const timer = document.querySelector('.game__timer');
    const countdownEl = document.createElement('div');
    countdownEl.classList.add('game__countdown');
    countdownEl.textContent = '5';
    timer.after(countdownEl);

    window.cardGame.countdownInterval = setInterval(() => {
        if (countdownEl.textContent > 1) {
            countdownEl.textContent -= 1;
        } else {
            clearInterval(window.cardGame.countdownInterval);
            countdownEl.textContent = 'Start';
            setTimeout(() => (countdownEl.textContent = ''), 1000);
            startTimer();
        }
    }, 1000);
}

function startTimer() {
    const timerDigits = document.querySelector('.game__digits');
    let time = 0;

    function setTime() {
        time += 1;
        const minutes = ('00' + Math.round(time / 60)).slice(-2);
        const seconds = ('00' + (time % 60)).slice(-2);
        timerDigits.textContent = `${minutes}.${seconds}`;
    }
    window.cardGame.timerInterval = setInterval(setTime, 1000);
    setTimeout(clearInterval, 600000, window.cardGame.timerInterval);
}
