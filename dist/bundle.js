/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/deck.js":
/*!********************************!*\
  !*** ./src/components/deck.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deck: () => (/* binding */ Deck)
/* harmony export */ });
/* harmony import */ var _img_spades_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/spades.svg */ "./src/img/spades.svg");
/* harmony import */ var _img_clubs_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/clubs.svg */ "./src/img/clubs.svg");
/* harmony import */ var _img_diamonds_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/diamonds.svg */ "./src/img/diamonds.svg");
/* harmony import */ var _img_hearts_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../img/hearts.svg */ "./src/img/hearts.svg");





// const suitsBackground = {
//     '♠': spades,
//     '♣': clubs,
//     '♥': hearts,
//     '♦': diamonds,
// };

class Deck {
    constructor() {
        this.SUITS = ['♠', '♣', '♥', '♦'];
        this.VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suitsBackground = {
            '♠': _img_spades_svg__WEBPACK_IMPORTED_MODULE_0__,
            '♣': _img_clubs_svg__WEBPACK_IMPORTED_MODULE_1__,
            '♥': _img_hearts_svg__WEBPACK_IMPORTED_MODULE_3__,
            '♦': _img_diamonds_svg__WEBPACK_IMPORTED_MODULE_2__,
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


/***/ }),

/***/ "./src/components/memoryGame.js":
/*!**************************************!*\
  !*** ./src/components/memoryGame.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGameField: () => (/* binding */ renderGameField)
/* harmony export */ });
/* harmony import */ var _deck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deck.js */ "./src/components/deck.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./src/index.js");



let countOpenedCards = 0;

function renderGameField(difficulty = 1) {
    const gameField = document.querySelector('.game__field');
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearTimeout(window.cardGame.flipTimeout);

    const deck = new _deck_js__WEBPACK_IMPORTED_MODULE_0__.Deck();
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
    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.renderApp)(window.cardGame.status, timerValue, result);
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderApp: () => (/* binding */ renderApp)
/* harmony export */ });
/* harmony import */ var _components_memoryGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/memoryGame.js */ "./src/components/memoryGame.js");
/* harmony import */ var _img_back_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/back.png */ "./src/img/back.png");
/* harmony import */ var _img_lose_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/lose.png */ "./src/img/lose.png");
/* harmony import */ var _img_win_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/win.png */ "./src/img/win.png");

__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");




window.cardGame = {};
window.cardGame.firstCard = {
    value: 0,
    suit: 0,
};
window.cardGame.secondCard = {
    value: 0,
    suit: 0,
};
const appElem = document.querySelector('.main_page');
const winOrLooseUrl = {
    выиграли: _img_win_png__WEBPACK_IMPORTED_MODULE_3__,
    проиграли: _img_lose_png__WEBPACK_IMPORTED_MODULE_2__,
};

function renderApp(mode = 0, timerValue = 0, resultWord) {
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

            (0,_components_memoryGame_js__WEBPACK_IMPORTED_MODULE_0__.renderGameField)(window.cardGame.difficulty);
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
    appElem.addEventListener('click', (event) => {
        const difficultyButtons = appElem.querySelectorAll(
            '.difficulty__selection-item'
        );
        const startBtn = appElem.querySelector('.start-button');
        const backBtn = appElem.querySelector('.back_btn');
        const againBtn = appElem.querySelector('.again_btn');
        const resultAgainBtn = appElem.querySelector('.result__again-btn');

        switch (true) {
            // Кнопки на сложность
            case event.target.classList.contains('difficulty__selection-item'):
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

                event.target.classList.add(
                    'difficulty__selection-item_checked'
                );
                window.cardGame.difficulty = event.target.textContent;
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


/***/ }),

/***/ "./src/img/back.png":
/*!**************************!*\
  !*** ./src/img/back.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e43bb962bdb0617fffe4.png";

/***/ }),

/***/ "./src/img/clubs.svg":
/*!***************************!*\
  !*** ./src/img/clubs.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b70f04120bc40abeead5.svg";

/***/ }),

/***/ "./src/img/diamonds.svg":
/*!******************************!*\
  !*** ./src/img/diamonds.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5f7200aaf768dfa663ec.svg";

/***/ }),

/***/ "./src/img/hearts.svg":
/*!****************************!*\
  !*** ./src/img/hearts.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c1b3e001283bca6dfff2.svg";

/***/ }),

/***/ "./src/img/lose.png":
/*!**************************!*\
  !*** ./src/img/lose.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9e4cdf5c08f46ab16142.png";

/***/ }),

/***/ "./src/img/spades.svg":
/*!****************************!*\
  !*** ./src/img/spades.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cd0a802e97b870f76655.svg";

/***/ }),

/***/ "./src/img/win.png":
/*!*************************!*\
  !*** ./src/img/win.png ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f6c892181b956b98ea24.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map