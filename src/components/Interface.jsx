import React from 'react';
import R from 'ramda';

import Board from './Board.jsx';

class Game {
}

class Interface extends React.Component {

  toggleState(index){
    let board = this.state.board;
    let cell = board[index].value === 'on' ? 'off' : 'on';
    board[index].value = cell;
    this.setState({board});
  }

  checkCell(index){
    let board = this.state.board;
    let message = board[index].value === 'on' ? 'hit' : 'miss';
    board[index].checked = true;
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
    let boardMaker = R.mapIndexed(({value, checked}, id) => { 
      return { id, value, checked }
    });
    return boardMaker(R.times(randomizer, boardSize));
  }

  render(){
    let board = this.state.board;
    return (
      <section className="game">
        <Board boardType="control" handleClick={ this.toggleState.bind(this) } board={ board }></Board>
        <Board boardType="game" handleClick={ this.checkCell.bind(this) } board={ board }></Board>
      </section>
    )
  }
}

Interface.defaultProps = {
  gridSize: 4
}

function randomizer(){
  return {
    value: 'off', 
    checked: false
  }
}

export default Interface;
