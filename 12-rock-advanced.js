let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlaying = false;
let intervalId;
updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() =>{
      playGame(pickComputerMove());
    },1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play').innerText = "Stop Auto Play";
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play').innerText = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
  updateScoreElement();
  document.querySelector('#js-result').innerHTML = result;
  document.querySelector('#js-game').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon">  <img src = "${computerMove}-emoji.png" class="move-icon"> Computer`;
  
}

function updateScoreElement(){
  document.querySelector('#js-score').innerHTML = `Wins : ${score.wins}, Lossses : ${score.losses}, Ties : ${score.ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

document.querySelector('.rock-button').addEventListener('click',()=>{
  playGame('rock');
});

document.querySelector('.paper-button').addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});

//use keyboard to play game
document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});
