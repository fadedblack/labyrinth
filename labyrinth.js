function getRandomNoInRange(min, max) { // 90, 100
  let randomNumber = 0;
  while (!(randomNumber <= max && randomNumber >= min)) {
    randomNumber = Math.ceil(Math.random() * 100);
  }

  return randomNumber;
}

function getBombPosition() {
  return Math.ceil(Math.random() * 100);
}

function isCorrectBombPosition(bombPosition) {
  let correctPosition = bombPosition - 11 !== '🧨';
  correctPosition = correctPosition && bombPosition - 10 !== '🧨';
  correctPosition = correctPosition && bombPosition - 9 !== '🧨';

  correctPosition = correctPosition && bombPosition - 1 !== '🧨';
  correctPosition = correctPosition && bombPosition + 1 !== '🧨';

  correctPosition = correctPosition && bombPosition + 9 !== '🧨';
  correctPosition = correctPosition && bombPosition + 10 !== '🧨';
  correctPosition = correctPosition && bombPosition + 11 !== '🧨';

  return correctPosition;
}

function generateBombs() {
  let totalNoOfBobms = 20;
  let bombPosition = '';

  while (totalNoOfBobms > 0) {
    bombPosition += getBombPosition() + ' ';
    if (isCorrectBombPosition(bombPosition)) {
      totalNoOfBobms -= 1;
    }
  }

  return bombPosition;
}

function didPlayerWin(position, endPosition) {
  return position === endPosition;
}

function getEndPosition() {
  return getRandomNoInRange(90, 100);
}

function getStartPosition() {
  const position = +prompt("Enter your starting position(1-10): ", "0");

  return position;
}

function isBombEncountered(position, bombPositions) {
  let currentBombPos = '';

  for (let index = 0; index < bombPositions.length; index++) {
    if (bombPositions[index] === ' ') {
      currentBombPos = '';
    }

    currentBombPos += bombPositions[index];

    if (+currentBombPos === position) {
      return true;
    }
  }

  return false;
}

function startGame() {
  const bombPositions = generateBombs();
  console.log(bombPositions);

  const endPosition = getEndPosition();
  console.log(endPosition);

  let startPosition = 95;

  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 100) {
      startPosition = getStartPosition();
    }
    if (isBombEncountered(startPosition, bombPositions)) {
      startPosition = 0;
    }
  }
  console.log(endPosition);
}

startGame();