import { renderGameField } from './components/memoryGame';
require('./css/styles.css');
import './img/back.png';
import looseImg from './img/lose.png';
import winImg from './img/win.png';

declare global {
    interface Window {
        cardGame: any;
    }
}

window.cardGame = {};
window.cardGame = {
    firstCard: {
        value: '0',
        suit: '0',
    },
    secondCard: {
        value: '0',
        suit: '0',
    },
    difficulty: 1,
    status: 'difficulty',
};

const appElem = document.querySelector('.main_page') as HTMLElement;
const winOrLooseUrl: { [key: string]: string }  = {
    выиграли: winImg,
    проиграли: looseImg,
};

export function renderApp(mode = '0', timerValue: string | null = '0', resultWord = 'выиграли'): void {
    switch (mode) {
        default:
            appElem.innerHTML = `
                <div class="difficulty">
                    <h1 class="difficulty__heading">Выбери<br>сложность</h1>
                    <div class="difficulty__selection">
                        <button class="difficulty__selection-item">1</button>
                        <button class="difficulty__selection-item">2</button>
                        <button class="difficulty__selection-item">3</button>
                    </div>
                    <button class="btn start-button">Старт</button>
                </div>
            `;
            break;

        case 'game':
            appElem.style.flexDirection = 'column';
            appElem.innerHTML = `
            <div class="game">
                <div class="game__header">
                    <div class="game__timer">
                        <div class="game__min-sec">min</div>
                        <div class="game__min-sec">sec</div>
                        <div class="game__digits">00.00</div>
                    </div>
                    <button class="btn again_btn">Начать заново</button>
                </div>
                <div class="game__field">
                </div>
            </div>
            <p>Сложность ${window.cardGame.difficulty}</p>
            <button class="btn back_btn">Назад</button>
            `;

            renderGameField(window.cardGame.difficulty);
            break;

        case 'result':
            appElem.innerHTML =
                appElem.innerHTML +
                `<div class="shadow"></div>
                <div class="difficulty result">
                    <img src="${winOrLooseUrl[resultWord]}" alt="result" class="result__img">
                    <h1 class="result__heading">Вы ${resultWord}!</h1>
                    <p class="result__text">Затраченное время:</p>
                    <p class="result__time">${timerValue}</p>
                    <button class="btn result__again-btn">Играть снова</button>
                </div>
                `;
            break;
    }
    addListenerOnApp();
}
// Делегирую события на один листенер
function addListenerOnApp() {
    appElem.addEventListener('click', (event: MouseEvent): void => {
        const difficultyButtons = Array.from(
            appElem.querySelectorAll('.difficulty__selection-item')
            );
        const startBtn = appElem.querySelector('.start-button');
        const backBtn = appElem.querySelector('.back_btn');
        const againBtn = appElem.querySelector('.again_btn');
        const resultAgainBtn = appElem.querySelector('.result__again-btn');

        const target = event.target as HTMLElement;
        switch (true) {
            // Кнопки на сложность
            case target.classList.contains('difficulty__selection-item'):
                window.cardGame.difficulty = '1';

                for (let button of difficultyButtons) {
                    button.addEventListener('click', () => {
                        difficultyButtons.forEach((el) =>
                            el.classList.remove(
                                'difficulty__selection-item_checked'
                            )
                        );
                    });
                }

                target.classList.add(
                    'difficulty__selection-item_checked'
                );
                window.cardGame.difficulty = target.textContent;
                break;
            // Кнопка старт
            case event.target === startBtn:
                window.cardGame.status = 'game';
                renderApp(window.cardGame.status);
                break;
            // Кнопка назад
            case event.target === backBtn:
                window.cardGame.status = null;
                renderApp(window.cardGame.status);
                break;
            // Кнопка начать заново
            case event.target === againBtn:
                window.cardGame.firstCard = {
                    value: 0,
                    suit: 0,
                };
                renderApp(window.cardGame.status);
                break;
            // Кнопка начать заново на результате игры
            case event.target === resultAgainBtn:
                window.cardGame.status = null;
                renderApp(window.cardGame.status);
        }
    });
}

renderApp(window.cardGame.status);
