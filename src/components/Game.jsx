import React from 'react';
import R from 'ramda';

import GameBoard from './GameBoard.jsx';
import ControlBoard from './ControlBoard.jsx';

class Game extends React.Component {

  toggleState(index){
    let board = this.state.board;
    let cell = board[index].value === 'on' ? 'off' : 'on';
    board[index].value = cell;
    this.setState({board});
  }

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
        <ControlBoard toggleState={ this.toggleState.bind(this) } board={ board }></ControlBoard>
        <GameBoard board={ board }></GameBoard>
      </section>
    )
  }
}

Game.defaultProps = {
  gridSize: 4
}

function randomizer(){
  let values = ['on', 'off'];
  return _.sample(values);
}

export default Game;
