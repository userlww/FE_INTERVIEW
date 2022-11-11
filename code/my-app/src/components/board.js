import React from "react";
import Square from "./square";
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: new Array(9).fill(null),
      xIsNext:true
    }

  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} handleClick={()=>this.handleClick(i)} />;
  }

  render() {
    const winRes = this.calculateWinner(this.state.squares);
    let status
    if(winRes) {
      status = 'Winner:' + winRes;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');

    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  handleClick(i){
    const squares = this.state.squares;
    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      squares,
      xIsNext:!this.state.xIsNext
    })
  }
  calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let i = 0;i< lines.length;i++) {
      const [a,b,c] = [...lines[i]]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
        return squares[a]
      }
    }
    return null
  }
}

export default Board
