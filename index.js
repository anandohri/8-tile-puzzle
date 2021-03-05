import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Tiles(props){
  return(
    <button classname = "square" value = {props.value} onCLick = {props.onCLick} >
      {props.value}
    </button>
  )
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {seq: [0,0,0,0,0,0,0,0,0]}

    this.assignState = this.assignState.bind(this);
    this.renderNumber = this.renderNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  assignState(){
    for(let i = 1; i < 9 ; i++){
      let ind = Math.floor(Math.random() * 10);
      if(this.state.seq[ind] === 0){
        this.state.seq[ind] = i
      }
      else{
        i = i - 1;
      }
    }
  }

  renderNumber(i){
    return(
      <Tiles value = {i} onClick = {this.handleClick(i)} />
    )
  }

  handleClick(i){
    var arr = this.state.seq.slice();
    if(i < 8){
      arr[i] = arr[i] + arr[i+1];
      arr[i+1] = arr[i] - arr[i+1];
      arr[i] = arr[i] - arr[i+1];
    }
    
  }

  render(){
    return(
      <div>
        {this.assignState()}
        <div className="board-row">
          {this.renderNumber(this.state.seq[0])}
          {this.renderNumber(this.state.seq[1])}
          {this.renderNumber(this.state.seq[2])}
        </div>
        <div className="board-row">
          {this.renderNumber(this.state.seq[3])}
          {this.renderNumber(this.state.seq[4])}
          {this.renderNumber(this.state.seq[5])}
        </div>
        <div className="board-row">
          {this.renderNumber(this.state.seq[6])}
          {this.renderNumber(this.state.seq[7])}
          {this.renderNumber(this.state.seq[8])}
        </div>
      </div>
    )
  }
}

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {random: [1,2]};

  }

  render(){
    this.setState({random: this.state.random.concat(4)})
    return(
      this.state.random
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
