var bool = true;
var lastGameTie = true;
var tieToggle = false;
var winner = false;
var prevWinner = false;
var pos = [0,0,0,0,0,0,0,0,0];
var tally = { X: 0, O: 0 };
var names = ['x', 'o'];
var xWon = 'xxx';
var oWon = 'ooo';
names[0] = prompt('who wants to be x?');
names[1] = prompt('who wants to be o?');

document.getElementById('turn').innerHTML = 'it\'s ' + names[0] + '\'s turn.';

var resetBoard = function() {
  for (var i = 0; i < 9; i++) {
    document.getElementById("box"+i).innerHTML = '';
    document.getElementById("box"+i).classList.remove('winner');
  }
  winner = false;
  pos = [0,0,0,0,0,0,0,0,0];
  if (prevWinner && !lastGameTie) {
    prevWinner === 'x' ? bool = true : bool = false;
  } else {
    bool = tieToggle;
    tieToggle = !tieToggle
  }  
  var next;
  bool ? next = names[0] : next = names[1]
  document.getElementById("turn").innerHTML = "it's " + next + "'s turn."
  document.getElementById("btn").innerHTML = 'reset';
}

var findWinner = function(one, two, three) {
  if (one === xWon || two === xWon || three === xWon) {
    winner = names[0] + ' wins';
  } else if (one === oWon || two === oWon || three === oWon) {
    winner = names[1] + ' wins';
  }
}

var checkRows = function() {
  var row1 = pos[0] + pos[1] + pos[2];
  if (row1 === 'xxx' || row1 === 'ooo') { 
    document.getElementById('box0').classList.add('winner');
    document.getElementById('box1').classList.add('winner');
    document.getElementById('box2').classList.add('winner');
  }
  var row2 = pos[3] + pos[4] + pos[5];
  if (row2 === 'xxx' || row2 === 'ooo') { 
    document.getElementById('box3').classList.add('winner');
    document.getElementById('box4').classList.add('winner');
    document.getElementById('box5').classList.add('winner');
  }
  var row3 = pos[6] + pos[7] + pos[8];
  if (row3 === 'xxx' || row3 === 'ooo') { 
    document.getElementById('box6').classList.add('winner');
    document.getElementById('box7').classList.add('winner');
    document.getElementById('box8').classList.add('winner');
  }
  findWinner(row1, row2, row3);
}

var checkColumns = function() {
  var col1 = pos[0] + pos[3] + pos[6];
  if (col1 === 'xxx' || col1 === 'ooo') { 
    document.getElementById('box0').classList.toggle('winner');
    document.getElementById('box3').classList.toggle('winner');
    document.getElementById('box6').classList.toggle('winner');
  }
  var col2 = pos[1] + pos[4] + pos[7];
  if (col2 === 'xxx' || col2 === 'ooo') { 
    document.getElementById('box1').classList.toggle('winner');
    document.getElementById('box4').classList.toggle('winner');
    document.getElementById('box7').classList.toggle('winner');
  }
  var col3 = pos[2] + pos[5] + pos[8];
  if (col3 === 'xxx' || col3 === 'ooo') { 
    document.getElementById('box2').classList.toggle('winner');
    document.getElementById('box5').classList.toggle('winner');
    document.getElementById('box8').classList.toggle('winner');
  }
  findWinner(col1, col2, col3);
}

var checkAcross = function() {
  var cross1 = pos[0] + pos[4] + pos[8];
  if (cross1 === 'xxx' || cross1 === 'ooo') { 
    document.getElementById('box0').classList.toggle('winner');
    document.getElementById('box4').classList.toggle('winner');
    document.getElementById('box8').classList.toggle('winner');
  }
  var cross2 = pos[2] + pos[4] + pos[6];
  if (cross2 === 'xxx' || cross2 === 'ooo') { 
    document.getElementById('box2').classList.toggle('winner');
    document.getElementById('box4').classList.toggle('winner');
    document.getElementById('box6').classList.toggle('winner');
  }
  findWinner(cross1, cross2);
}

var toggleClick = function(id) {
  var ind = id.split('')[3]
  if (document.getElementById(id).innerHTML === '' && !winner) {
    if (!bool) {
      document.getElementById(id).innerHTML = 'o';
    } else {
      document.getElementById(id).innerHTML = 'x';
    }
    
    bool = !bool;
    pos[ind] === 0 ? pos[ind] = document.getElementById(id).innerHTML : null;

    checkRows();
    checkColumns();
    checkAcross();

    if (!pos.includes(0) && !winner) {
      winner = "it's a tie. reset and play again."
      lastGameTie= true;
      document.getElementById("turn").innerHTML = winner;
    } else if (winner) {
      document.getElementById("btn").innerHTML = 'play again';
      document.getElementById("turn").innerHTML = winner;
      lastGameTie = false;
      var val = winner.split(' ')[0];
      if (val === names[0]) {
        prevWinner = 'x';
        tally.X++;
        document.getElementById('tallyx').innerHTML = 'player x.. ' + tally.X;
      } else {
        prevWinner = names[1];
        tally.O++;
        document.getElementById('tallyo').innerHTML = 'player o.. ' + tally.O;
      }
    }
  }
}
