class Game {
  toggleCell(index, board){
    let cell = board[index].value === 'on' ? 'off' : 'on';
    board[index].value = cell;
    return board;
  }

  createBoard(gridSize){
    let boardSize = gridSize * gridSize;
    let boardMaker = R.mapIndexed(({value, checked}, id) => {
      return { id, value, checked }
    });
    return boardMaker(R.times(randomizer, boardSize));
  }

  checkCell(index, board){
    let message = board[index].value === 'on' ? 'hit' : 'miss';
    board[index].checked = true;
  }
}

