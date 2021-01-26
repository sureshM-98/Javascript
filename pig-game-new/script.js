'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const gameRulesTitle = document.querySelector('.game-rules-title');
const wrapper = document.querySelector('.wrapper');

let currentScore, activePlayer, playing, scores;

// Strarting conditions
const int = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
int();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Getting random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check is it one
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    // Check player score >= 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener('click', int);

//Modal functionality to show the rules
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});
// the above can also be written like
// btnCloseModal.addEventListener('click', closeModal)

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
