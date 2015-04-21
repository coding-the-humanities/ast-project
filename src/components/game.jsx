import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import Board from './Board.jsx'

class Game extends React.Component {
  
  constructor(props){ 
    super(props);
    let board = this.createBoard(this.props.gridSize);
    this.state = {
      board: board,
      gridSize: this.props.gridSize
    }
  }

  setCellState(cellState){
    console.log(cellState.value);
    let board = this.state.board;
    let oldCell = board[cellState.id];
    oldCell.value = oldCell.value === 'off' ? R.times(randomizer, 4) : cellState.value;
    this.setState({ board });
  }

  createBoard(gridSize){
    let boardSize = gridSize * gridSize;
    let boardMaker = R.mapIndexed((value, id) => { return { id, value }});
    let boardArray = boardMaker(R.times(makeUndefined, boardSize));
    return boardArray;
  }

  render(){
    let board = this.state.board;
    return (
      <section className="game">
        <Board setCellState={ this.setCellState.bind(this) } board={ board }></Board>
      </section>
    )
  }
}

Game.defaultProps = {
  gridSize: 4
}
function makeUndefined(){
  return 'undecided';
}

function randomizer(){
  let values = ['on', 'off'];
  return _.sample(values);
}

export default Game;
