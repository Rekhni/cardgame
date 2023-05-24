import { renderGameField } from './components/memoryGame.js';
require('./css/styles.css');
import './img/back.png';
import looseImg from './img/lose.png';
import winImg from './img/win.png';

window.cardGame = {};

window.cardGame.firstCard = {
    value: 0,
    suit: 0,
};

window.cardGame.secondCard = {
    value: 0,
    suit: 0,
};

const appEl = document.querySelector('.main_page');
const winOrLoseImg = {
    выиграли: winImg,
    проиграли: looseImg,
};

export function renderApp(mode = 0, timerValue = 0, resultStatement) {
    switch (mode) {
        default:
            appEl.innerHTML = `
            <div class="levels">
                <h2 class="levels_title">
                    Выбери    сложность
                </h2>
                <div id ="form">
                    <label class="levels_number">
                        <input type="radio" name="level" value="1" />
                        1
                    </label>
                    <label class="levels_number">
                        <input type="radio" name="level" value="2" />
                        2
                    </label>
                    <label class="levels_number">
                        <input type="radio" name="level" value="3" />
                         3
                    </label>
                </div>
                <button class="button start_button">Старт</button>
            </div>
        `;
            break;

        case 'levels':
            appEl.style.flexDirection = 'column';
            appEl.innerHTML = `
        <div class="game">
            <div class="game__header">
                <div class="game__timer">
                    <div class="game__min-sec">min</div>
                    <div class="game__min-sec">sec</div>
                    <div class="game__digits">00.00</div>
                </div>
                <button class="button again_button">Начать заново</button>
            </div>
            <div class="game__field">
            </div>
        </div>
        <p>Сложность ${window.cardGame.level}</p>
        <button class="button back_button">Назад</button>
        `;

            renderGameField(window.cardGame.result);
            break;
        case 'status':
            appEl.innerHTML = `
        <div class="shadow"></div>
                <div class="difficulty result">
                    <img src="${winOrLoseImg[resultStatement]}" alt="result" class="result__img">
                    <h1 class="result__heading">Вы ${resultStatement}!</h1>
                    <p class="result__text">Затраченное время:</p>
                    <p class="result__time">${timerValue}</p>
                    <button class="btn result__again-btn">Играть снова</button>
                </div>
            `;
            break;
    }
    addListenerOnApp();
}

function addListenerOnApp() {
    appEl.addEventListener('click', (event) => {
        const levelButtons = appEl.querySelectorAll('.levels_number');
        const startButton = appEl.querySelector('.start_button');
        const goBackButton = appEl.querySelector('.back_button');
        const startAgainButton = appEl.querySelector('.button');
        const resultAgainBtn = appEl.querySelector('.result__again-btn');

        switch (true) {
            // Кнопки на сложность
            case event.target.classList.contains('levels_number'):
                window.cardGame.level = '1';

                for (let button of levelButtons) {
                    button.addEventListener('click', () => {
                        levelButtons.forEach((el) =>
                            el.classList.remove('number_checked')
                        );
                    });
                }

                event.target.classList.add('number_checked');
                window.cardGame.level = event.target.textContent;
                break;
            // Кнопка старт
            case event.target === startButton:
                window.cardGame.result = 'levels';
                renderApp(window.cardGame.result);
                break;
            // Кнопка назад
            case event.target === goBackButton:
                window.cardGame.status = null;
                renderApp(window.cardGame.result);
                break;
            // Кнопка начать заново
            case event.target === startAgainButton:
                window.cardGame.firstCard = {
                    value: 0,
                    suit: 0,
                };
                renderApp(window.cardGame.result);
                break;
            // Кнопка начать заново на результате игры
            case event.target === resultAgainBtn:
                window.cardGame.result = null;
                renderApp(window.cardGame.result);
        }
    });
}

renderApp(window.cardGame.result);
