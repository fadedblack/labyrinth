const playerName = '🤩';

function repeat(char, times) {
  if (times < 1) {
    return '';
  }

  return char + repeat(char, times - 1);
}

function getTopBorder(leftCorner, rightCorner, middle) {
  const middlePart = middle + repeat('━', 4);
  return leftCorner + repeat('━', 4) + repeat(middlePart, 9) + rightCorner;
}

function getRowBorder() {
  return '┣━━━━' + repeat('╋━━━━', 9) + '┫';
}

function fillCells(cellContext, cellNumber, boxNumber) {
  if (cellNumber === boxNumber) {
    return ' ' + cellContext + ' ┃';
  }

  return ' ⬜ ┃';
}

function createRow(cellContext, cell, rowStartIndex) {
  let string = '';

  for (let index = rowStartIndex; index > rowStartIndex - 10; index -= 1) {
    string += fillCells(cellContext, cell, index);
  }

  return '┃' + string;
}

function createGrid(cellContext, cellNumber) {
  let grid = getTopBorder('┏', '┓', '┳') + '\n';

  for (let noOfRows = 10; noOfRows > 0; noOfRows -= 1) {
    grid += createRow(cellContext, cellNumber, noOfRows * 10) + '\n';

    if (noOfRows !== 1) {
      grid += getRowBorder() + '\n';
    }
  }

  return grid + getTopBorder('┗', '┛', '┻');
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
  let totalNoOfBombs = 20;
  const bombPosition = [];

  while (totalNoOfBombs > 0) {
    const index = 20 - totalNoOfBombs;
    bombPosition[index] = getBombPosition();

    if (isCorrectBombPosition(bombPosition[index])) {
      totalNoOfBombs -= 1;
    }
  }

  return bombPosition;
}

function didPlayerWin(position, endPosition) {
  return position === endPosition;
}

function getEndPosition() {
  return 100 + Math.ceil(Math.random() * (110 - 100));
}

function createMessageBox(message) {
  const box = '┏' + repeat('━', message.length) + '┓\n┃' + message + '┃\n┗';
  return box + repeat('━', message.length) + '┛';
}

function getStartPosition() {
  const position = +prompt("Enter your starting position(1-10): ", "01");

  if (position < 11 && position > 0) {
    return position;
  }

  console.log(createMessageBox("Starting position can be between 1 and 10"));
  console.log(createMessageBox("Please Enter a valid position...!"));

  return getStartPosition();
}

function isBombEncountered(position, bombPositions) { // can be made into a function which checks whether an element is present in array or not
  for (let index = 0; index < bombPositions.length; index++) {
    if (bombPositions[index] === position) {
        return true;
    }
  }

  return false;
}

function isValidKey(key) {
  return key === 'a' || key === 's' || key === 'd' || key === 'w';
}

function getKey() {
  const key = prompt("Enter a key to move..");

  if (!isValidKey(key)) {
    console.log(createMessageBox("Please enter an Valid key!!!"));
    return getKey();
  }

  return key;
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

function updateGrid(icon, position, message) {
  console.log(createGrid(icon, position));
  console.log(createMessageBox(message));
}

function getPosition(position, destination) {
  let startPosition = getNextPosition(position);

  while (!isValidPosition(startPosition, destination)) {
    console.log(createMessageBox("Invalid destination"));

    if (startPosition === 101) {
      startPosition = getNextPosition(startPosition - 1);
      continue; //maybe not use continue
    }

    startPosition = getNextPosition(startPosition - 10);
  }

  return startPosition;
}

function startGame() {
  const bombPositions = generateBombs();
  const endPosition = getEndPosition();

  let startPosition = 0;
  console.log(createGrid()); // move into an display function

  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 1) {
      startPosition = getStartPosition();
    }
    console.clear();

    if (isBombEncountered(startPosition, bombPositions)) {
      updateGrid('💥', startPosition, "Ohh..You encountered a Bomb💥💥..");
      startPosition = 0;

      continue;
    }

    updateGrid(playerName, startPosition, "a: 👈   w: 👆   d: 👉   s: 👇");
    startPosition = getPosition(startPosition, endPosition);
  }

  console.clear();
  updateGrid('🎉', startPosition - 10, "Congrats..🎉..You found the destination🤩🥳"); // display function
}

startGame();
