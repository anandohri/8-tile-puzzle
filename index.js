import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Tiles(props){
  return(
    <button className = "square" value = {props.value} onClick = {() => props.onClick(props.value)} >
      {props.value}
    </button>
  )
}

const win = [1,2,3,4,5,6,7,8,0]

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {seq: this.assignState()};
  }

  assignState = () => {
    let arr = [0,1,2,3,4,5,6,7,8];
    for(let i = 8; i > 0; --i){
      const j = Math.floor(Math.random() * (i+1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr; 
  }

  renderNumber = (i) => {
    return(
      <Tiles value = {i} onClick = {this.handleClick} />
    )
  }

  checkWin = () => {
    if(this.state.seq === win){
      return true;
    }
    return false;
  }

  handleClick = (i) => {
    if(this.checkWin()){
      return;
    }
    const arr = this.state.seq.slice();
    const adjacent = this.validMove(i);
    if(adjacent === false){
      return;
    }
    else{
      const temp = arr[adjacent[0]];
      arr[adjacent[0]] = arr[adjacent[1]];
      arr[adjacent[1]] = temp;
    }
    this.setState({seq: arr});
  }

  validMove = (i) => {
    for(let j = 0; j < 9; ++j){
      if(this.state.seq[j] === i){
        if(j-1 >= 0 && this.state.seq[j-1] === 0){
          const adjacent = [j-1, j];
          return adjacent;
        }
        else if(j-3 >= 0 && this.state.seq[j-3] === 0){
          const adjacent = [j-3, j];
          return adjacent;
        }
        else if(j+1 <= 8 && this.state.seq[j+1] === 0){
          const adjacent = [j+1, j];
          return adjacent;
        }
        else if(j+3 <= 8 && this.state.seq[j+3] === 0){
          const adjacent = [j+3, j];
          return adjacent;
        }
      }
    }
    return false;
  }

  render(){
    const rows = [];

    for (let i=0; i<3; ++i) {
      const rowItems = [];
      for(let j =0; j<3; ++j){
        const rowItem = (
          this.renderNumber(this.state.seq[(i*3)+j])
        );

        rowItems.push(rowItem);
      }
      const row = (
        <div className="board-row">
          {rowItems}
        </div>
      );

      rows.push(row);
    }

    return(
      <div>
        <h1 className = 'header'>8-Tile Puzzle</h1>
        <hr />
        {rows}
        <hr />
        <br />
        <p className = 'para'>
        The <b>8-tile puzzle</b> is a sliding puzzle that is played on a 3-by-3 grid with 8 square tiles labeled 1 through 8, plus a blank square, in this case 0.
        The goal is to rearrange the tiles so that they are in row-major order, using as few moves as possible.
        You are permitted to slide tiles either horizontally or vertically into the blank square.
        </p>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
