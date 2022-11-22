const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const scoreText = document.querySelector('.score-text');

let position = 0;
let isJumping = false;
let isGameOver = false;
let score = 0;

function handleKeyup(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 220) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = 1000 + 'px';

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      score = score + 10;
      scoreText.innerHTML = `
      <h2>${score}</h2>
      `;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      isGameOver = true;
      document.body.innerHTML = `
      <div class="background"></div>
      <div class="game-over">
        <h1>GAME OVER!</h1>
        <h2>Score: ${score}</h2>
        <button class="play-again" onclick="rebootGame()">Play again</button>
      </div>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function rebootGame() {
  const gameOver = document.querySelector('.game-over');
  document.body.removeChild(gameOver);
  location.reload(true);
}

createCactus();
document.addEventListener('keyup', handleKeyup);
