const express = require('express')
var bodyParser = require('body-parser')
var csvConvert = require('./request-handler.js')
const app = express()


app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  var data = JSON.parse(req.body.input);
  res.send(JSON.stringify(csvConvert.getCSV(data)));
})

app.listen(3000, function() {
  console.log('app listening on port 3000')
})