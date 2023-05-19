


const renderApp = (mode = 0) => {
    const appEl = document.querySelector('.main_page');

    if (mode === 'status') {
        appEl.innerHTML = appEl.innerHTML + ``;
    } 
    else if (mode ==='levels') {
        appEl.style.flexDirection = 'column';
        appEl.innerHTML = `
        <h1 class="level_result_title">Cложность игры уровень: ${localStorage.getItem('cardgame_level')}</h1>
        <button class="button">Начать заново</button>
        `;

        const startAgainBtn = appEl.querySelector('.button');
        startAgainBtn.addEventListener('click', () => {
        localStorage.removeItem('cardgame_result');
        renderApp(localStorage.getItem('cardgame_result'));
        })
    }

    else {
        appEl.innerHTML = `
            <div class="levels">
                <h2 class="levels_title">
                    Выбери    сложность
                </h2>
                <div id ="form">
                    <label class="level_number">
                        <input type="radio" name="level" value="1" />
                        1
                    </label>
                    <label class="level_number">
                        <input type="radio" name="level" value="2" />
                        2
                    </label>
                    <label class="level_number">
                        <input type="radio" name="level" value="3" />
                         3
                    </label>
                </div>
                <button class="button start_button">Старт</button>
            </div>
        `;

        const levelButtons = appEl.querySelectorAll('.level_number');
        localStorage.setItem('cardgame_level', '1');

        for (let levelButton of levelButtons) {
            levelButton.addEventListener('click', () => {
                levelButtons.forEach((el) => el.classList.remove('.number_checked'));
                levelButton.classList.add('.number_checked');
                localStorage.setItem('cardgame_level', levelButton.textContent);
            })
        }

        const startButton = document.querySelector('.start_button');
        startButton.addEventListener('click', () => {
            localStorage.setItem('cardgame_result', 'levels');
            renderApp(localStorage.getItem('cardgame_result'));
        })
    }
}


renderApp(localStorage.getItem('cardgame_result'));



