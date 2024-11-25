const p1Name = '🤩';
const p2Name = '😎';
const p3Name = '😴';
const p4Name = '😳';

function repeat(char, times) {
  if (times < 1) {
    return '';
  }

  return char + repeat(char, times - 1);
}

function getHeading() {
  return '┏' + repeat('━', 4) + repeat('┳━━━━', 9) + '┓';
}

function getFooting() {
  return '┗' + repeat('━', 4) + repeat('┻━━━━', 9) + '┛';
}

function getRowFooting() {
  return '┣━━━━' + repeat('╋━━━━', 9) + '┫';
}

function getCharsInCell(cellContext, cellNumber, boxNumber) {
  if (cellNumber === boxNumber) {
    return ' ' + cellContext + ' ┃';
  }

  return ' ⬜ ┃';
}

function createRow(cellContext, cellNumber, rowStartNumber) {
  let rowString = '';

  for (let boxNumber = rowStartNumber; boxNumber > rowStartNumber - 10; boxNumber--) {
    rowString += getCharsInCell(cellContext, cellNumber, boxNumber);
  }

  return '┃' + rowString;
}

function createGrids(cellContext, cellNumber) {
  let grid = getHeading() + '\n';

  for (let noOfRows = 10; noOfRows > 0; noOfRows--) {
    grid += createRow(cellContext, cellNumber, noOfRows * 10) + '\n';

    if (noOfRows !== 1) {
      grid += getRowFooting() + '\n';
    }
  }

  return grid + getFooting();
}

function getRandomNoInRange(to, from) {
  return from + Math.ceil(Math.random() * (to - from));
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
  return getRandomNoInRange(100, 110);
}

function getALine(length) {
  let line = '';

  for (let iterator = 0; iterator < length; iterator += 1) {
    line += '━';
  }

  return line;
}

function createMessageBox(message) {
  const box = '┏' + getALine(message.length) + '┓\n┃' + message + '┃\n┗';
  return box + getALine(message.length) + '┛';
}

function getStartPosition() {
  const position = +prompt("Enter your starting position(1-10): ", "01");

  if (position < 11 && position > 0) {
    return position;
  }

  console.log(createMessageBox("Starting position can be between 1 and 10 🙄"));
  console.log(createMessageBox("Please Enter a valid position...!"));

  return getStartPosition();
}

function isBombEncountered(position, bombPositions) {
  let bombPosition = '';

  for (let index = 0; index < bombPositions.length; index++) {
    bombPosition += bombPositions[index];

    if (bombPositions[index] === ' ') {
      if (+bombPosition === position) {
        return true;
      }
      bombPosition = '';
    }

  }

  return false;
}

function iskeyPressedValid(key) {
  return key === 'a' || key === 's' || key === 'd' || key === 'w';
}

function getKey() {
  const keyPressed = prompt("Enter a key to move..");

  if (!iskeyPressedValid(keyPressed)) {
    console.log("Please enter an Valid key..");
    return getKey();
  }

  return keyPressed;
}

function getNextPosition(currentPosition) {
  const key = getKey();

  if (key === 'a') return currentPosition + 1;
  if (key === 'w') return currentPosition + 10;
  if (key === 'd') return currentPosition - 1;
  if (key === 's') return currentPosition - 10;
}

function isValidPosition(position, destination) {
  return !(position > 100 && position !== destination);
}

function startGame() {
  const bombPositions = generateBombs();
  const endPosition = getEndPosition();

  let startPosition = 0;
  console.log(createGrids());

  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 1) {
      startPosition = getStartPosition();
    }
    console.clear();

    if (isBombEncountered(startPosition, bombPositions)) {
      console.log(createGrids('💥', startPosition));
      console.log("Ohh..You encountered a Bomb💥💥..");
      startPosition = 0;

      continue;
    }

    console.log(createGrids(p1Name, startPosition));
    console.log("a : ⬅️   w : ⬆️   d : ➡️  s : ⬇️");

    startPosition = getNextPosition(startPosition);

    while (!isValidPosition(startPosition, endPosition)) {
      console.log("Invalid destination");
      if (startPosition === 101) {
        startPosition = getNextPosition(startPosition - 1);
      }
      else {
        startPosition = getNextPosition(startPosition - 10);
      }
    }
  }
  console.clear();
  console.log(createGrids('🎉',startPosition - 10));
  console.log("Congrats..🎉..You found the destination🤩🥳");
}

startGame();