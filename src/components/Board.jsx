import React from 'react';
import R from 'ramda';
import _ from 'lodash';

import GameBoardCell from './Cell.jsx';

class Board extends React.Component {
  render(){
    let board = this.props.board;
    let boardSize = board.length;
    let boardSide = Math.sqrt(boardSize);
    let placeholderRows = R.times(R.identity, boardSide);

    let createRow = R.map((cell) => {
      return <GameBoardCell key={ cell.id } index={ cell.index } state={ cell.value }/>;
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

    return (
      <section className="board">
        { grid }
      </section>
    )
  }
}

export default Board;
