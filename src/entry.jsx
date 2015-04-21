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

  componentDidMount(){
    let gridSize = this.state.gridSize;
    setInterval(()=>{
      gridSize = gridSize + 1;
      let board = this.createBoard(gridSize);
      return this.setState({ board, gridSize });
    }, 1000);
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
