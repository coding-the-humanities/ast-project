import React from 'react';
import Board from './Board.jsx';
import _ from 'lodash';
import R from 'ramda';

class BoardCell extends React.Component {

  handleClick(){
  	let state = this.props.state;
  	let value = _.isArray(state) || !state === 'newGrid' || randomizer();
    this.props.setCellState({value, id: this.props.id });
  }

  render(){
    let cellState = this.props.state;
  	let classes = ['cell', `cell-is-${cellState}`];

    if(_.isArray(cellState)){
      let states = cellState;
      return (
        <section className="board">
          <section className="row">
            <BoardCell state={ states[0] }/>
            <BoardCell state={ states[1] }/>
          </section>
          <section className="row">
            <BoardCell state={ states[2] }/>
            <BoardCell state={ states[3] }/>
          </section>
        </section>
      )
    }

    return (
      <button className={ classes.join(' ') }
              disabled={ this.props.state === 'on' }
              onClick={this.handleClick.bind(this) }>
       </button>
    )
  }
}

export default BoardCell;

function randomizer(){
  let values = ['on', 'off'];
  return _.sample(values);
}