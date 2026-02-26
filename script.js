'use strict';
/*roll dice = generate random No
displays number - current score
shows number - dice pic
each time roll dice = new number 

if > 1 = add to current score + display
if 1 = reset to 0 and switch player

hold = add current number to main score
if main score < 100 switches player to player 2
if main score >= 100 = player ? wins the game

new game = current scores = 0
main scores = 0
set player 1 as starting player
*/
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let diceImg = document.querySelector('.dice');

//starting conditions

let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');

//buttons
const hold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const reset = document.querySelector('.btn--new');

let currentScore, activePlayer, scores, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceImg.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${roll}.png`;

    //3. check for rolled one. if true, switch to next player
    if (roll !== 1) {
      //add dice to current score
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    // document.getElementById(`current--${activePlayer}`).textContent =
    //   currentScore;
    // document.getElementById(`current--${activePlayer}`).textContent = 0;
    // currentScore = 0;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check winner
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceImg.classList.add('hidden');
    }
    //   btnRoll.style.display = 'none';
    // switch to next player
    switchPlayer();
    // if (activePlayer === 0) {
    //   currentScore0.textContent = currentScore[activePlayer];
    //   scores[activePlayer] += currentScore[activePlayer];
    //   score0.textContent = scores[activePlayer];
    //   currentScore0.textContent = 0;
    //   currentScore[activePlayer] = 0;

    //   if (scores[activePlayer] >= 50) {
    //     player0.classList.add('player--winner');
    //     hold.style.display = 'none';
    //     btnRoll.style.display = 'none';
    //   }

    //   player0.classList.toggle('player--active');
    //   player1.classList.toggle('player--active');
    //   activePlayer = activePlayer === 0 ? 1 : 0;
    // } else {
    //   currentScore1.textContent = currentScore[activePlayer];
    //   scores[activePlayer] += currentScore[activePlayer];
    //   score1.textContent = scores[activePlayer];
    //   currentScore1.textContent = 0;
    //   currentScore[activePlayer] = 0;

    //   if (scores[activePlayer] >= 50) {
    //     player1.classList.add('player--winner');
    //     hold.style.display = 'none';
    //     btnRoll.style.display = 'none';
    //   }

    //   player0.classList.toggle('player--active');
    //   player1.classList.toggle('player--active');
    //   activePlayer = activePlayer === 0 ? 1 : 0;
    // }
  }
});

reset.addEventListener('click', init);
