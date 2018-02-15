import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0]],
      turn: true,
      winner: "connect four"

    }
    this.handleClick = this.handleClick.bind(this);
  }

  checkRows() {
    var board = this.state.board;
    for (var i = 0; i <board.length; i++) {
      for (var j = 0; j < 10; j++) {
        var temp = board[i][j] + board[i][j+1] + board[i][j+2] + board[i][j+3]
        if (temp === 'XXXX') {
          console.log('x wins')
          this.setState({winner: 'red wins.'});
        } else if(temp === 'OOOO') {
          console.log('o wins')
          this.setState({winner: 'yellow wins.'});
        }
      }
    }

  }

  checkColumns() {
    var board = this.state.board;
    for (var i = 0; i <board.length-3; i++) {
      for (var j = 0; j < 7; j++) {
        var temp = board[i][j] + board[i+1][j] + board[i+2][j] + board[i+3][j]
        if (temp === 'XXXX') {
          console.log('x wins')
          this.setState({winner: 'red wins.'});
        } else if(temp === 'OOOO') {
          console.log('o wins')
          this.setState({winner: 'yellow wins.'});
        }
      }
    }
  }

  checkAcross() {
   var board = this.state.board;
   var vert1 = [board[2][0], board[3][1], board[4][2], board[5][3]]
   var vert2 = [board[1][0], board[2][1], board[3][2], board[4][3], board[5][4]]
   var vert3 = [board[0][0], board[1][1], board[2][2], board[3][3], board[4][4],board[5][5]];
   var vert4 = [board[0][1], board[1][2], board[2][3], board[3][4], board[4][5], board[5][6]];
   var vert5 = [board[0][2], board[1][3], board[2][4], board[3][5],board[4][6]];
   var vert6 = [board[0][3], board[1][4], board[2][5], board[3][6]];
   var vert7 = [board[2][6], board[3][5], board[4][4], board[5][3]];
   var vert8 = [board[1][6], board[2][5], board[3][4], board[4][3], board[5][2]];
   var vert9 = [board[0][6], board[1][5], board[2][4], board[3][3], board[4][2], board[5][1]];
   var vert10 = [board[0][5], board[1][4], board[2][3], board[3][2], board[4][1], board[5][0]];
   var vert11 = [board[0][4], board[1][3], board[2][2], board[3][1], board[4][0]];
   var vert12 = [board[0][3], board[1][2], board[2][1], board[3][0]];
   var verts = [vert1, vert2, vert3, vert4, vert5, vert6, vert7, vert8, vert9, vert10, vert11, vert12]

   return checkRows(verts);
  }

  checkTies() {
    var tie = true;
    var board = this.state.board;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          tie = false;
          break;
        }
      }
    }
    if (tie) {
      this.setState({winner: "it's a tie."});
    }
  }

  handleClick(e) {
    if (this.state.winner === "connect four"){
      var id = e.target.id;
      var board = this.state.board;
      var x = id.split('-')[0];
      var y = id.split('-')[1];
      var posx;
      var posy;
      
      for (var i = 5; i >= 0; i--) {
        if (board[i][y] === 0) {
          this.state.turn ? board[i][y] = 'X' : board[i][y] = 'O';
          this.setState({turn: !this.state.turn});
          posx = i;
          posy = y;
          break;
        }
      }
      if (this.state.turn) {
        $("#"+posx+"-"+posy).addClass("red")
      } else {
        $("#"+posx+"-"+posy).addClass("yellow")
      }
      
      this.checkRows();
      this.checkColumns();
      this.checkAcross();
      this.checkTies(); 
    }
  }

  render() {

    var board = [];
    for (var i = 0; i < 6; i++) {
      var rowID = `${i}`
      var cell = [];
      for (var j = 0; j < 7; j++) {
        var cellID = `${i}-${j}`
        cell.push(<td key={cellID} id={cellID} className="box" onClick={this.handleClick}>{this.state.board[i][j]}</td>)
      }
      board.push(<tr key={i} id={rowID} className="board">{cell}</tr>)
    }

    return (
      <div>
        <table>
          <tbody>
            {board}
          </tbody>
        </table>
        <h1>{this.state.winner}</h1>
      </div>
      );
  }
}

export default App;

