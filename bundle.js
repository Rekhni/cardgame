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

/***/ "./src/components/deck.ts":
/*!********************************!*\
  !*** ./src/components/deck.ts ***!
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var Deck = /** @class */ (function () {
    function Deck() {
        var _this = this;
        this.SUITS = ['♠', '♣', '♥', '♦'];
        this.VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.suitsBackground = {
            '♠': _img_spades_svg__WEBPACK_IMPORTED_MODULE_0__,
            '♣': _img_clubs_svg__WEBPACK_IMPORTED_MODULE_1__,
            '♥': _img_hearts_svg__WEBPACK_IMPORTED_MODULE_3__,
            '♦': _img_diamonds_svg__WEBPACK_IMPORTED_MODULE_2__,
        };
        this.cardPresets = [3, 3, 6, 9];
        this.cardsNodeList = null;
        this.cards = this.VALUES.reduce(function (result, value) {
            for (var _i = 0, _a = _this.SUITS; _i < _a.length; _i++) {
                var suit = _a[_i];
                result.push({
                    value: value,
                    suit: suit,
                    html: "\n                    <div data-value=".concat(value, " data-suit=").concat(suit, " class=\"card\" >\n                        <div class=\"card__back\"></div>\n                        <div class=\"card__face\" style=\"background: url('").concat(_this.suitsBackground[suit], "') center center no-repeat, rgb(255, 255, 255);\">\n                            <div class=\"card__top\">    \n                                <div class=\"card__value\">").concat(value, "\n                                </div>\n                                <img class=\"card__suit\" src=\"").concat(_this.suitsBackground[suit], "\" alt=\"suit\">\n                            </div>\n                            <div class=\"card__bottom\">    \n                                <div class=\"card__value\">").concat(value, "\n                                </div>\n                                <img class=\"card__suit\" src=\"").concat(_this.suitsBackground[suit], "\" alt=\"suit\">\n                            </div>\n                        </div>\n                    </div>\n                    "),
                });
            }
            return result;
        }, []);
    }
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var newIndex = Math.floor(Math.random() * (i + 1));
            _a = [
                this.cards[newIndex],
                this.cards[i],
            ], this.cards[i] = _a[0], this.cards[newIndex] = _a[1];
        }
        return this;
    };
    Deck.prototype.cut = function (difficulty) {
        if (difficulty === void 0) { difficulty = 1; }
        this.cards = this.cards.slice(0, this.cardPresets[difficulty]);
        return this;
    };
    Deck.prototype.double = function () {
        this.cards = __spreadArray([this.cards], this.cards, true).flat();
        return this;
    };
    Deck.prototype.prepare = function (difficulty) {
        return this.shuffle().cut(difficulty).double().shuffle();
    };
    Deck.prototype.render = function (element) {
        if (element === void 0) { element = document.body; }
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            element.innerHTML = element.innerHTML += card.html;
        }
        this.cardsNodeList = document.querySelectorAll('.card');
        return this;
    };
    Deck.prototype.flipAllCards = function () {
        if (!this.cardsNodeList)
            return;
        this.cardsNodeList.forEach(function (element) {
            var face = element.querySelector('.card__face');
            var back = element.querySelector('.card__back');
            face.classList.add('card__flip-face');
            back.classList.add('card__flip-back');
        });
        return this;
    };
    return Deck;
}());



/***/ }),

/***/ "./src/components/memoryGame.ts":
/*!**************************************!*\
  !*** ./src/components/memoryGame.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGameField: () => (/* binding */ renderGameField)
/* harmony export */ });
/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deck */ "./src/components/deck.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.ts");


var countOpenedCards = 0;
function renderGameField(difficulty) {
    if (difficulty === void 0) { difficulty = 1; }
    var gameField = document.querySelector('.game__field');
    var deck = new _deck__WEBPACK_IMPORTED_MODULE_0__.Deck();
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearTimeout(window.cardGame.flipTimeout);
    countOpenedCards = 0;
    window.cardGame.currentDeck = deck.prepare(difficulty).render(gameField);
    window.cardGame.flipTimeout = setTimeout(function () {
        deck.flipAllCards();
        addCardListener();
    }, 5000);
    countdown();
}
function addCardListener() {
    var cards = Array.from(document.body.querySelectorAll('.card'));
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
        var card = cards_1[_i];
        card.addEventListener('click', compareCards);
    }
    function compareCards(event) {
        var card = event.currentTarget;
        var face = card.querySelector('.card__face');
        var back = card.querySelector('.card__back');
        var resetCard = function () { return ({ value: '0', suit: '0' }); };
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
            }
            else {
                window.cardGame.secondCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                countOpenedCards++;
                card.removeEventListener('click', compareCards);
                // Условие проигрыша
                if (window.cardGame.firstCard.value !==
                    window.cardGame.secondCard.value ||
                    window.cardGame.firstCard.suit !==
                        window.cardGame.secondCard.suit) {
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
function checkAndDisplayResult(result) {
    clearInterval(window.cardGame.timerInterval);
    countOpenedCards = 0;
    var timerValue = document.querySelector('.game__digits')
        .textContent;
    window.cardGame.status = 'result';
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.renderApp)(window.cardGame.status, timerValue, result);
}
function countdown() {
    var timer = document.querySelector('.game__timer');
    var countdownEl = document.createElement('div');
    countdownEl.classList.add('game__countdown');
    countdownEl.textContent = '5';
    timer.after(countdownEl);
    window.cardGame.countdownInterval = setInterval(function () {
        if (Number(countdownEl.textContent) > 1) {
            countdownEl.textContent = String(Number(countdownEl.textContent) - 1);
        }
        else {
            clearInterval(window.cardGame.countdownInterval);
            countdownEl.textContent = 'Start';
            setTimeout(function () { return (countdownEl.textContent = ''); }, 1000);
            startTimer();
        }
    }, 1000);
}
function startTimer() {
    var timerDigits = document.querySelector('.game__digits');
    var time = 0;
    function setTime() {
        time += 1;
        var minutes = ('00' + Math.floor(time / 60)).slice(-2);
        var seconds = ('00' + (time % 60)).slice(-2);
        timerDigits.textContent = "".concat(minutes, ".").concat(seconds);
    }
    window.cardGame.timerInterval = setInterval(setTime, 1000);
    setTimeout(clearInterval, 600000, window.cardGame.timerInterval);
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderApp: () => (/* binding */ renderApp)
/* harmony export */ });
/* harmony import */ var _components_memoryGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/memoryGame */ "./src/components/memoryGame.ts");
/* harmony import */ var _img_back_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/back.png */ "./src/img/back.png");
/* harmony import */ var _img_lose_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/lose.png */ "./src/img/lose.png");
/* harmony import */ var _img_win_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/win.png */ "./src/img/win.png");

__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");



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
var appElem = document.querySelector('.main_page');
var winOrLooseUrl = {
    выиграли: _img_win_png__WEBPACK_IMPORTED_MODULE_3__,
    проиграли: _img_lose_png__WEBPACK_IMPORTED_MODULE_2__,
};
function renderApp(mode, timerValue, resultWord) {
    if (mode === void 0) { mode = '0'; }
    if (timerValue === void 0) { timerValue = '0'; }
    if (resultWord === void 0) { resultWord = 'выиграли'; }
    switch (mode) {
        default:
            appElem.innerHTML = "\n                <div class=\"difficulty\">\n                    <h1 class=\"difficulty__heading\">\u0412\u044B\u0431\u0435\u0440\u0438<br>\u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C</h1>\n                    <div class=\"difficulty__selection\">\n                        <button class=\"difficulty__selection-item\">1</button>\n                        <button class=\"difficulty__selection-item\">2</button>\n                        <button class=\"difficulty__selection-item\">3</button>\n                    </div>\n                    <button class=\"btn start-button\">\u0421\u0442\u0430\u0440\u0442</button>\n                </div>\n            ";
            break;
        case 'game':
            appElem.style.flexDirection = 'column';
            appElem.innerHTML = "\n            <div class=\"game\">\n                <div class=\"game__header\">\n                    <div class=\"game__timer\">\n                        <div class=\"game__min-sec\">min</div>\n                        <div class=\"game__min-sec\">sec</div>\n                        <div class=\"game__digits\">00.00</div>\n                    </div>\n                    <button class=\"btn again_btn\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n                </div>\n                <div class=\"game__field\">\n                </div>\n            </div>\n            <p>\u0421\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C ".concat(window.cardGame.difficulty, "</p>\n            <button class=\"btn back_btn\">\u041D\u0430\u0437\u0430\u0434</button>\n            ");
            (0,_components_memoryGame__WEBPACK_IMPORTED_MODULE_0__.renderGameField)(window.cardGame.difficulty);
            break;
        case 'result':
            appElem.innerHTML =
                appElem.innerHTML +
                    "<div class=\"shadow\"></div>\n                <div class=\"difficulty result\">\n                    <img src=\"".concat(winOrLooseUrl[resultWord], "\" alt=\"result\" class=\"result__img\">\n                    <h1 class=\"result__heading\">\u0412\u044B ").concat(resultWord, "!</h1>\n                    <p class=\"result__text\">\u0417\u0430\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:</p>\n                    <p class=\"result__time\">").concat(timerValue, "</p>\n                    <button class=\"btn result__again-btn\">\u0418\u0433\u0440\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430</button>\n                </div>\n                ");
            break;
    }
    addListenerOnApp();
}
// Делегирую события на один листенер
function addListenerOnApp() {
    appElem.addEventListener('click', function (event) {
        var difficultyButtons = Array.from(appElem.querySelectorAll('.difficulty__selection-item'));
        var startBtn = appElem.querySelector('.start-button');
        var backBtn = appElem.querySelector('.back_btn');
        var againBtn = appElem.querySelector('.again_btn');
        var resultAgainBtn = appElem.querySelector('.result__again-btn');
        var target = event.target;
        switch (true) {
            // Кнопки на сложность
            case target.classList.contains('difficulty__selection-item'):
                window.cardGame.difficulty = '1';
                for (var _i = 0, difficultyButtons_1 = difficultyButtons; _i < difficultyButtons_1.length; _i++) {
                    var button = difficultyButtons_1[_i];
                    button.addEventListener('click', function () {
                        difficultyButtons.forEach(function (el) {
                            return el.classList.remove('difficulty__selection-item_checked');
                        });
                    });
                }
                target.classList.add('difficulty__selection-item_checked');
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map