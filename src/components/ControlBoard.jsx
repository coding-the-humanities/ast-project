import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import Cell from './Cell.jsx';

class ControlBoard extends React.Component {

  handleClick(index){
    this.props.toggleState(index);
  }

  createGrid(board){
    let boardSize = board.length;
    let boardSide = Math.sqrt(boardSize);
    let placeholderRows = R.times(R.identity, boardSide);

    let createRow = R.map((cell) => {
      return <Cell key={ cell.id } 
                       handleClick={ this.handleClick.bind(this, cell.id) }
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
      <section className="board board-control">
        { grid }
      </section>
    )
  }
}

export default ControlBoard;
