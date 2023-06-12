import { renderGameField } from './components/memoryGame.js';
window.cardGame = {};

const renderApp = (mode = 0) => {
    const appEl = document.querySelector('.main_page');

    if (mode === 'status') {
        appEl.innerHTML = appEl.innerHTML + ``;
    } else if (mode === 'levels') {
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

        const goBackButton = appEl.querySelector('.back_button');
        goBackButton.addEventListener('click', () => {
            window.cardGame.result = null;
            renderApp(window.cardGame.result);
        });

        const startAgainButton = appEl.querySelector('.button');
        startAgainButton.addEventListener('click', () => {
            renderApp(window.cardGame.result);
        });

        renderGameField(window.cardGame.result);
    } else {
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

        const levelButtons = appEl.querySelectorAll('.levels_number');
        window.cardGame.level = '1';

        for (let levelButton of levelButtons) {
            levelButton.addEventListener('click', () => {
                levelButtons.forEach((el) =>
                    el.classList.remove('.number_checked')
                );
                levelButton.classList.add('.number_checked');
                window.cardGame.level = levelButton.textContent;
            });
        }

        const startButton = document.querySelector('.start_button');
        startButton.addEventListener('click', () => {
            window.cardGame.result = 'levels';
            renderApp(window.cardGame.result);
        });
    }
};

renderApp(window.cardGame.result);
