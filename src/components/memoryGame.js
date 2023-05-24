import { Deck } from './deck.js';
import { renderApp } from '../index.js';

let countDisclosedCards = 0;

// assigning values and keys to first and second clicked cards

// rendering the gamefield itself

export function renderGameField(level = 1) {
    const gameField = document.querySelector('.game__field');
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearInterval(window.cardGame.flipTimeout);

    const deck = new Deck();
    const cardPresets = [3, 3, 6, 9];
    window.cardGame.currentDeck = deck
        .shuffle()
        .cut(cardPresets[+level])
        .double()
        .shuffle()
        .render(gameField);

    window.cardGame.flipTimeout = setTimeout(() => {
        flipCards();
        addCardListener();
    }, 5000);
    countdown();
}

// adding function which enables to click on a certain card

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

        setTimeout(checkRules, 800);

        function checkRules() {
            if (!window.cardGame.firstCard.value) {
                window.cardGame.firstCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                countDisclosedCards++;
                card.removeEventListener('click', compareCards);
            } else {
                window.cardGame.secondCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                countDisclosedCards++;
                card.removeEventListener('click', compareCards);

                if (
                    window.cardGame.firstCard.value !==
                        window.cardGame.secondCard.value ||
                    window.cardGame.firstCard.suit !==
                        window.cardGame.secondCard.suit
                ) {
                    checkAndDisplayResult('Игра закончилась');
                }
                window.cardGame.firstCard = resetCard();
                window.cardGame.secondCard = resetCard();
            }

            if (
                countDisclosedCards === window.cardGame.currentDeck.cards.length
            ) {
                checkAndDisplayResult('Выиграли');
            }
        }
    }
}

function checkAndDisplayResult(result) {
    clearInterval(window.cardGame.timerInterval);
    countDisclosedCards = 0;
    const timerValue = document.querySelector('.game__digits').textContent;
    window.cardGame.result = 'result';
    renderApp(window.cardGame.result, timerValue, result);
}

// function enabling to flip clicked card

function flipCards() {
    const cards = document.body.querySelectorAll('.card');

    for (let card of cards) {
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');

        face.classList.add('card__flip-face');
        back.classList.add('card__flip-back');
    }
}

// function enabling to countdown until start of the game

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

// function serving to display the duration of game

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
