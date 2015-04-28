import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import Board from './Board.jsx';

class Game extends React.Component {
  constructor(props){
    super(props);
    let board = this.createBoard(this.props.gridSize);
    this.state = {
      board: board,
      gridSize: this.props.gridSize
    }
  }

  createBoard(gridSize){
    let boardSize = gridSize * gridSize;
    let boardMaker = R.mapIndexed((value, id) => { return { id, value }});
    return boardMaker(R.times(randomizer, boardSize));
  }

  render(){
    let board = this.state.board;
    return (
      <section className="game">
        <Board board={ board }></Board>
      </section>
    )
  }
}

Game.defaultProps = {
  gridSize: 4
}

function randomizer(){
  let values = [0, 1];
  return _.sample(values);
}

export default Game;
