var bool = true;
var positions = [0,0,0,0,0,0,0,0,0];
var xWon = 'XXX';
var oWon = 'OOO';
var winner = false;

var resetBoard = function() {
  var i = 0;
  while (i < 9) {
    document.getElementById("box"+i).innerHTML = '---';
    i++;
  }
  winner = false;
  bool = true;
  positions = [0,0,0,0,0,0,0,0,0];
  document.getElementById("result").innerHTML = '';
}

var checkRows = function(arr) {
  var row1 = positions[0] + positions[1] + positions[2];
  var row2 = positions[3] + positions[4] + positions[5];
  var row3 = positions[6] + positions[7] + positions[8];

  if (row1 === xWon || row2 === xWon || row3 === xWon) {
    winner = 'Player X Wins';
  } else if (row1 === oWon || row2 === oWon || row3 === oWon) {
    winner = 'Player O Wins';
  }

}

var checkColumns = function(arr) {
  var col1 = positions[0] + positions[3] + positions[6];
  var col2 = positions[1] + positions[4] + positions[7];
  var col3 = positions[2] + positions[5] + positions[8];

  if (col1 === xWon || col2 === xWon || col3 === xWon) {
    winner = 'Player X Wins';
  } else if (col1 === oWon || col2 === oWon || col3 === oWon) {
    winner = 'Player O Wins';
  }
}

var checkAcross = function(arr) {
  var cross1 = positions[0] + positions[4] + positions[8];
  var cross2 = positions[2] + positions[4] + positions[6];

  if (cross1 === xWon || cross2 === xWon) {
    winner = 'Player X Wins';
  } else if (cross1 === oWon || cross2 === oWon) {
    winner = 'Player O Wins';
  }
}

var handleClick = function(id) {
  var mark = document.getElementById(id).innerHTML;
  if (mark === '---' && !winner) {
    if (!bool) {
      document.getElementById(id).innerHTML = 'O';
      mark = 'O';
    } else {
      document.getElementById(id).innerHTML = 'X';
      mark = 'X';
    }
    bool = !bool;

    var ind = id.split('')[3]
    positions[ind] === 0 ? positions[ind] = mark : null;

    checkRows(positions);
    checkColumns(positions);
    checkAcross(positions);

    if (!positions.includes(0)) {
      winner = "It's a tie. Hit RESET and play again!"
    }

    winner ? document.getElementById("result").innerHTML = winner : null;
  }
}

