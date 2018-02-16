import React from 'react';
import ReactDOM from 'react-dom';
import NumPad from './numPad.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      turns:0,
      frames:10,
      pinsLeft: 10,
      strike: false,
      active: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
    this.renderScores = this.renderScores.bind(this);

  }

  handleClick (e) {
    var num = +e.target.id;
    var turn = this.state.frames;
    var newTotal = this.state.total + num;
    if (turn > 0) {
      console.log(turn);
      this.setState({total: newTotal});
      this.setState({frames: this.state.frames - 1})
    } else {
      this.setState({active: true})
    }
  }

  sendData() {
    var obj = {
      name: 'giri',
      total: this.state.total
    }
    $.ajax({
      url: 'http://127.0.0.1:3000',
      method: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        console.log('success')
      },
      error: function(err) {
        console.log('error')
      }
    })
  }

  getData(callback) {
    $.ajax({
      url: 'http://127.0.0.1:3000/scores',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        callback(data)
        console.log('success')
      },
      error: function(err) {
        console.log('error')
      }
    })
  }

  renderScores() {
    this.getData(function(stuff) {
      var names = [];
      var scores = [];

      for (var i =0; i < stuff.length; i++) {
        for (var key in stuff[i]) {
          if (key === 'name') {
            names.push(stuff[i][key])
          } else if (key === 'total') {
            scores.push(stuff[i][key])
          }
        }
      }
      console.log(stuff);
      $(".oldnames").html(JSON.stringify(names));
      $(".oldtotal").html(JSON.stringify(scores));
    })
  }

  render() {

    if (this.state.active) {
      return (
        <div>
        <div>
          <button onClick={this.renderScores}>get scores</button>
        </div>
        <div className="oldnames"></div>
        <div className="oldtotal"></div>
          <div>
            <NumPad handleClick={this.handleClick}/>
          </div>
          <div>
            <p>current score = {this.state.total}</p>
          </div>
          <div className="endgame">
            <p>game over.</p>
            <button onClick={this.sendData}>submit score</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <button onClick={this.renderScores}>get scores</button>
        </div>
        <div className="oldnames"></div>
        <div className="oldtotal"></div>
        <div>
          <NumPad handleClick={this.handleClick}/>
        </div>
        <div>
          <p>current score = {this.state.total}</p>
        </div>
      </div>
    )
  }
}

export default App;