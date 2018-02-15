const express = require('express');
const app = express();
const path = require('path');



var pathname = path.join(__dirname + './../client/dist');

app.use(express.static(pathname));

app.listen(3000, function() {
  console.log('listening on port 3000')
})


