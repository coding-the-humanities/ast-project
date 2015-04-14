import React from 'react';

class GameBoardCell extends React.Component {
	handleClick(cellState){
		let message = cellState ? "hit" : "miss";
		console.log(message);
	}

  render(){
    return (
      <button onClick={this.handleClick.bind(this, this.props.state) }>GameBoardCell</button>
    )
  }
}

class SwitchBoardCell extends React.Component {
  render(){
    let state = this.props.state;
    let index = this.props.index;
    return (
      <button onClick={ this.props.toggleState.bind(this, index) }>{ this.props.state ? 'on' : 'off' }</button>
    )
	}
}

class Game extends React.Component {
  constructor(props){
		super(props);
		this.state = {
			board: [0,1,0,1,0,1,0,1]
		}
	}

	toggleState(index){
		console.log(index);
		let board = this.state.board;
		board[index] = !board[index];
		this.setState({board})
	}

  render(){  	
  	let board = this.state.board;
  	
  	return (
  		<section className="game">
  		  <section className="gameboard">
  		    { board.map((value, index) => <GameBoardCell key={ index } index={ index } state={ value }/>) }
  		  </section>
  		  <section className="switchboard">
  		   	{ board.map((value, index) => <SwitchBoardCell toggleState={ this.toggleState.bind(this) } key={ index } index={ index } state={ value }/>) }
  		  </section>        
   		</section>
  	)
  }
}

React.render(<Game />, document.body);
