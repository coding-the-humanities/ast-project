import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import Cell from './Cell.jsx';

class GameBoard extends React.Component {

  handleClick({value}){
    let message;
    if(value === 'on'){
      message = 'hit';
    }
    if(value === 'off'){
      message = 'miss';
    }
    console.log(message);
    return message; 
  }

  createGrid(board){
    let boardSize = board.length;
    let boardSide = Math.sqrt(boardSize);
    let placeholderRows = R.times(R.identity, boardSide);

    let createRow = R.map((cell) => {
      return <Cell key={ cell.id } 
                       handleClick={ this.handleClick }
                       index={ cell.index } 
                       state={ cell }/>;
    });

    let grid = R.map((rowIndex) => {
      let boardIndex = rowIndex * boardSide;
      let min = boardIndex;
      let max = min + boardSide;
      let row = R.slice(min, max)(board)
      return (
        <section className="row" key={ rowIndex }>
          { createRow(row) }
        </section>
      );
    }, placeholderRows)

    return grid;
  }

  render(){
    let board = this.props.board;
    let grid = this.createGrid(board);
    return (
      <section className="board board-game">
        { grid }
      </section>
    )
  }
}

export default GameBoard;
