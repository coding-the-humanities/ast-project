import R from 'ramda';
import React from 'react';
import Cell from './Cell.jsx';

class Board extends React.Component {

  handleClick(cell){
    this.props.handleClick(cell.id);
  }

  createGrid(board){
    let boardSize = board.length;
    let boardSide = Math.sqrt(boardSize);
    let placeholderRows = R.times(R.identity, boardSide);

    let createRow = R.map((cell) => {
      return <Cell key={ cell.id } 
                       handleClick={ this.handleClick.bind(this) }
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
    let classes = ['board', `board-${ this.props.boardType}`].join(' ');
    return (
      <section className={classes}>
        { grid }
      </section>
    )
  }
}

export default Board;
