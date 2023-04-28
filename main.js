import './styles.css';

import { getNewDeck, shuffleDeck, drawNewCard } from './helpers/api';

 
let deckId;
let playersScore = {
  1: 0,
  2: 0,
};

const shuffleButton = document.querySelector('.shuffle');
const drawButton = document.querySelector('.draw');
const stopButton = document.querySelector('.stop');

function restartGame() {
  playersScore = {
    1: 0,
    2: 0,
  };
  document.querySelector('.player-1.score').textContent = 0;
  document.querySelector('.player-2.score').textContent = 0;
  document.querySelector('.player-1.cards').textContent = '';
  document.querySelector('.player-2.cards').textContent = '';
  document.querySelector('.result').classList.add('hidden');
}

function startNewGame() {
  restartGame();
  getNewDeck().then((response) => {
    shuffleDeck(response.deck_id).then((data) => {
      deckId = data.deck_id;
      drawButton.disabled = false;
      stopButton.disabled = false;
      shuffleButton.disabled = true;
    });
  });
}

function addCardToPlayer(card, playerNumber) {
  const img = document.createElement('img');
  img.src = card.image;
  img.alt = `${card.value} of ${card.suit}`;
  img.classList.add('card');
  document.querySelector(`.player-${playerNumber}.cards`).appendChild(img);

  if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
    playersScore[playerNumber] += 10;
  } else if (card.value === 'ACE') {
    playersScore[playerNumber] += 1;
  } else {
    playersScore[playerNumber] += Number(card.value);
  }

  const playerScore = document.querySelector(`.player-${playerNumber}.score`);
  playerScore.textContent = playersScore[playerNumber];
}

function drawCard() {
  drawNewCard(deckId).then((card) => {
    addCardToPlayer(card, 1);

    if (playersScore[1] >= 21) {
      stopGame();
    }
  });
}

function stopGame() {
  drawButton.disabled = true;
  stopButton.disabled = true;
  shuffleButton.disabled = false;

  if (playersScore[1] > 21) {
    return showResult('lose');
  }

  dealerTurn().then(() => {
    if (playersScore[1] > playersScore[2] || playersScore[2] > 21) {
      showResult('win');
    } else {
      showResult('lose');
    }
  });  
}

function showResult(result) {
  const resultElement = document.querySelector('.result');
  resultElement.src = result === 'win' ? './src/imgs/win.png' : './src/imgs/lose.png';

  resultElement.classList.remove('hidden');
}

// adversário DEALER
async function dealerTurn() {
  // Eu vou forçar o oponente a SEMPRE comprar 3 cartas...
  const promises = [drawNewCard(deckId), drawNewCard(deckId), drawNewCard(deckId)];
  console.log(promises);

  Promise.all(promises).then((results) => {
    console.log(results);

    results.forEach((card) => {
      addCardToPlayer(card, 2);
    });
  }); 
}

shuffleButton.addEventListener('click', startNewGame);
drawButton.addEventListener('click', drawCard);
stopButton.addEventListener('click', stopGame);