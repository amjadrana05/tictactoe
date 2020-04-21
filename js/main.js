let orgBoard;
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [1,4,7],
  [0,3,6],
  [2,5,8],
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  orgBoard = Array.from(Array(9).keys());
  document.querySelector('.endgame').style.display = "none";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ""
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick);
  }  
}

function turnClick(cell) {
  if(typeof orgBoard[cell.target.id] == "number"){
    turn(cell.target.id, huPlayer)
    if(!checkTie()) turn(bestSopt(), aiPlayer)
  }
}

function turn (cellId, player) {
  orgBoard[cellId] = player;
  document.getElementById(cellId).innerHTML = player;
  let gameWon = checkWin(orgBoard, player)
  if(gameWon) gameOver(gameWon)
}

function checkWin(orgBoard, player) {
  let plays = orgBoard.reduce((a, c, i) => c === player ? a.concat(i):  a ,[])
  let gameWon = null;
  
  for(let [index, combo] of winCombos.entries()) {
    if(combo.every(item => plays.indexOf(item) > -1)) {
      gameWon = {index, player};
      break;
    }
  }
  return gameWon 
}

function gameOver(gameWon) {
  for (const item of winCombos[gameWon.index]) {
    document.getElementById(item).style.backgroundColor = gameWon.player == huPlayer ? 'red': 'blue'
  }
  for (const cell of cells) {
    cell.removeEventListener('click', turnClick);
  }
  winChecker(gameWon.player == huPlayer ? 'You Win!' : 'You Lose!');
}

function winChecker(name) {
  document.querySelector('.endgame').style.display = "block";
  document.querySelector('.endgame').innerHTML = name;
}

function avaiableSpace() {
  return orgBoard.filter(item => typeof item == 'number' );
}
function bestSopt() {
  return avaiableSpace()[0]
}

function checkTie() {
  if(avaiableSpace().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green"
      cells[i].removeEventListener('click', turnClick);
      winChecker('Game Tie!')
    }
    return true
  }
  return false
}