import React from 'react';
import './app.css';
import R from 'ramda';
import _ from 'lodash';

class GameBoardCell extends React.Component {
  handleClick(cellState){
    let message = cellState ? "hit" : "miss";
  }

  render(){
    return (
      <button className="cell" onClick={this.handleClick.bind(this, this.props.state) }></button>
    )
  }
}

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

class Game extends React.Component {
  constructor(props){
    super(props);
    let createBoard = R.mapIndexed((value, id) => { return { id, value }});
    let board = createBoard(R.times(randomizer, this.props.gridSize));
    this.state = {
      board: board
    }
  }

  toggleState(index){
    let board = this.state.board;
    board[index] = !board[index];
    this.setState({board})
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

React.render(<Game gridSize={1}/>, document.body);
