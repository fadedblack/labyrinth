const p1Name = '😁';
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

function getCharsInCell(p1Pos, cellNumber, bombBoxNumber) {
  if (cellNumber === bombBoxNumber) {
    return ' ' + '💥' + ' ┃';
  }

  if (p1Pos === cellNumber) {
    return ' ' + p1Name + ' ┃';
  }

  return ' ⬜ ┃';
}


function createRow(p1Pos, rowStartNumber, bombBoxNumber) {
  let rowString = '';

  for (let boxNumber = rowStartNumber; boxNumber > rowStartNumber - 10; boxNumber--) {
    rowString += getCharsInCell(p1Pos, boxNumber, bombBoxNumber);
  }

  return '┃' + rowString;
}

function createGrids(p1Pos, bombBox) {
  let grid = getHeading() + '\n';

  for (let noOfRows = 10; noOfRows > 0; noOfRows--) {
    grid += createRow(p1Pos, noOfRows * 10, bombBox) + '\n';

    if (noOfRows !== 1) {
      grid += getRowFooting() + '\n';
    }
  }

  return grid + getFooting();
}

function updatePlayersPosition(position) {
  return createGrids(position);
}


function getRandomNoInRange(to, from) { // 90, 100
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
  let noOfBombs = 20;
  let bombPosition = '';

  while (noOfBombs > 0) {
    bombPosition += getBombPosition() + ' ';
    if (isCorrectBombPosition(bombPosition)) {
      noOfBombs -= 1;
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

function getStartPosition() {
  const position = +prompt("Enter your starting position(1-10): ", "0");

  if (position < 10 && position > 0) {
    return position;
  }

  console.log("Starting position can only be between 1 and 10");
  console.log("Enter the valid position!!!");

  return getStartPosition();
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

  switch (key) {
    case 'a':
      return currentPosition + 1;
    case 'w':
      return currentPosition + 10;
    case 'd':
      return currentPosition - 1;
    case 's':
      return currentPosition - 10;
  }
}

function wait(time) {
  for (let i = 0; i < time; i += 1) {
  } 
  console.clear();
}

function loadingScreen(string) {
  let message = string;
  for (let dots = 0; dots < 6; dots += 1) {
    wait(1000000000);
    message += '.';
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
    console.log(message);
  }
}

function loadScreen() {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
  console.log(loadingScreen('\t\t\t\t\t\t\t\tLOADING LABYRINTH'));
}

function startGame() {
  const bombPositions = generateBombs();
  // console.log(bombPositions);

  const endPosition = getEndPosition();
  // console.log(endPosition);

  loadScreen();
  console.clear();
  let startPosition = 0;
  console.log(createGrids());

  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 1) {
      startPosition = getStartPosition();
    }
    console.clear();

    if (isBombEncountered(startPosition, bombPositions)) {
      console.log(createGrids(startPosition, startPosition));
      prompt("Ohh..You encountered a Bomb💥..Press enter");
      startPosition = 0;

      continue;
    }

    console.log(createGrids(startPosition));
    console.log("a : ⬅️   w : ⬆️   d : ➡️  s : ⬇️");

    startPosition = getNextPosition(startPosition);
  }
  console.log("Congrats..🎉..You found the destination🤩🥳");
}
startGame();

// console.log(updatePlayersPosition(10));