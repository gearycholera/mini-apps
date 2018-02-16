var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db.js');

var pathname = path.join(__dirname + './../client/dist');

app.use(bodyParser.json());

app.use(express.static(pathname));

app.post('/', function(req,res){
  var entry = new db.Scores(req.body);
  entry.save().then(() => console.log('added entry to db'))
  res.send(req.body);
})

app.get('/scores', function(req, res) {
  db.Scores.find({}, function(err, data) {
    if (err) {
      console.log('error in the app.get')
    } else {
      res.send(data);
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000')
})

