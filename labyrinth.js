const p1Name = '😁';
const p2Name = '😎';
const p3Name = '😴';
const p4Name = '😳';

function getHeading() {
  return '┏━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┓';
}

function getFooting() {
  return '┗━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┛';
}

function getRowFooting() {
  return '┣━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━┫';
}

function getCharsInCell(p1Pos,cellNumber, bombBoxNumber) {
  if (cellNumber === bombBoxNumber) {
    return ' ' + '💥' + ' ┃';
  }

  if (p1Pos === cellNumber) {
    return ' ' + p1Name + ' ┃';
  }
  return ' ⬜ ┃';
}


function createRow(p1Pos,rowStartNumber, bombBoxNumber) {
  let rowString = '';

  for (let boxNumber = rowStartNumber; boxNumber > rowStartNumber - 10; boxNumber--) {
    rowString += getCharsInCell(p1Pos,boxNumber, bombBoxNumber);
  }

  return '┃' + rowString;
}

function createGrids(p1Pos,bombBox) {
  let grid = getHeading() + '\n';

  for (let noOfRows = 10; noOfRows > 0; noOfRows--) {
    grid += createRow(p1Pos,noOfRows * 10, bombBox) + '\n';

    if (noOfRows !== 1) {
      grid += getRowFooting() + '\n';
    }
  }

  return grid + getFooting();
}

function updatePlayersPosition(position) {
  return createGrids(position);
}


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

  if (position > 10) {
    console.log("Starting position can only be between 1 and 10");
    console.log("Enter the valid position!!!");

    return getStartPosition();
  }

  return position;
}

function isBombEncountered(position, bombPositions) {
  let currentBombPos = '';

  for (let index = 0; index < bombPositions.length; index++) {
    currentBombPos += bombPositions[index];

    if (bombPositions[index] === ' ') {
      if (+currentBombPos === position) {
        return true;
      }
      currentBombPos = '';
    }

  }

  return false;
}

function startGame() {
  const bombPositions = generateBombs();
  console.log(bombPositions);

  const endPosition = getEndPosition();
  // console.log(endPosition);

  let startPosition = 0;
  console.log(createGrids());

  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 1) {
      startPosition = getStartPosition();
    }
    console.clear();

    if (isBombEncountered(startPosition, bombPositions)) {
      console.clear();
      startPosition = 0;
    }

    console.log(updatePlayersPosition(startPosition));
    break;
  }
  // console.log(endPosition);
}

startGame();

// console.log(updatePlayersPosition(10));
