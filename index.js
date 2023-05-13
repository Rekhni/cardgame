
const renderApp = (mode = 0) => {
    const appEl = document.querySelector('.main_page');

    if (mode === 'status') {
        appEl.innerHTML = appEl.innerHTML + ``;
    } 
    else if (mode ==='levels') {
        appEl.style.flexDirection = 'column';
        appEl.innerHTML = `
        <p>Cложность игры уровень: ${localStorage.getItem('cardgame_level')}</p>
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
                <div class="levels_numbers">
                    <button class="number">1</button> 
                    <button class="number">2</button> 
                    <button class="number">3</button> 
                </div>
                <button class="button start_button">Старт</button>
            </div>
        `;

        const levelButtons = appEl.querySelectorAll('.number');
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
