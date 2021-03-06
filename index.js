import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button className="square" onClick = {props.onClick}
        >
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      return <Square 
      value = {this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      />
    }
  
    render() {
      return (
        <div>
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
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:[{
            squares : Array(9).fill(null),
            }],
            stepNumber : 0, 
            xNext : true,
        };
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const latest = history[history.length-1];
        const squares = latest.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        if(this.state.xNext) {
            squares[i] = 'X';
        }
        else {
            squares[i] = 'O';
        }
        this.setState({
            history: history.concat([{
            squares: squares,
            }]),
            stepNumber: history.length,
            xNext : !this.state.xNext,
        });
       
    }
    jumpTo(step) {
        this.setState({
            stepNumber : step,
           xNext : (step%2)===0,
        });
    }
    render() {
      const history = this.state.history;
      const latest = history[this.state.stepNumber];
      const winner = calculateWinner(latest.squares);

      const moves = history.map((step, move) => {
          const description = move ?
          'Go to move ' + move:
          'Go to start of game';
          return (
              <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{description}</button>
              </li>
          );
      });

      let status;
      if(winner) {
          status = winner +" won."
      }
      else {
        status = (this.state.isNext)?'Next player: X':'Next player: O';
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares = {latest.squares}
            onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }