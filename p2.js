const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');
const score1Element = document.querySelector('#score--0');
const score2Element = document.querySelector('#score--1');
const diceElement = document.querySelector('.dice');
const rollButton = document.querySelector('.btn--roll');
const newGameButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
const currentScore1Element = document.getElementById('current--0');
const currentScore2Element = document.getElementById('current--1');
const activePlayers = document.getElementsByClassName('player--active');

let scores, currentScore, activePlayer, playing;

const initializeGame = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1Element.textContent = 0;
    score2Element.textContent = 0;
    currentScore1Element.textContent = 0;
    currentScore2Element.textContent = 0;

    diceElement.classList.add('hidden');
    player1Element.classList.remove('player--winner');
    player2Element.classList.remove('player--winner');
    player1Element.classList.add('player--active');
    player2Element.classList.remove('player--active');
};

initializeGame();

rollButton.addEventListener('click', () => {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;

        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;

            player1Element.classList.toggle('player--active');
            player2Element.classList.toggle('player--active');
        }
    }
});

holdButton.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;

            player1Element.classList.toggle('player--active');
            player2Element.classList.toggle('player--active');
        }
    }
});

newGameButton.addEventListener('click', initializeGame);