import R from 'ramda';

class Game {

  createBoard(gridSize){
    let boardSize = gridSize * gridSize;
    let boardMaker = R.mapIndexed(({value, checked}, id) => {
      return { id, value, checked }
    });
    let board = boardMaker(R.times(this.initializer, boardSize));
    let started = false;
    return { started, board };
  }

  toggleCell(index, board){
    let cell = board[index].value === 'on' ? 'off' : 'on';
    board[index].value = cell;
    return board;
  }

  checkCell(index, board){
    let message = board[index].value === 'on' ? 'hit' : 'miss';
    board[index].checked = true;
    let gameEnded = this.isOver(board);
    if(gameEnded){
      alert('its over: challenger won!');
    }

    return board;
  }

  isOver(board){
    let amount = 0;
    board.forEach((cell) => {
      if(!cell.checked && cell.value === 'on'){
        amount += 1;
      }
    });
    return !amount;
  };

  initializer(){
    return {
      value: 'off',
      checked: false
    }
  }
}

export default Game;
