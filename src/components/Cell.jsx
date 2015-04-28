import React from 'react';
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

export default GameBoardCell;
