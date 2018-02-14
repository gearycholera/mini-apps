var output = [];
var counter = 1;

var getKeys = function(obj) {
  var temp = ['id']
  for (var key in obj) {
    if (key !== 'children') {
      temp.push(key);
    }
  }
  var firstLine = temp.join(',');
  output.push(firstLine);
}

var getKids = function(obj) {
  var temp = [counter];
  for (var key in obj) {
    if (key !== 'children') {
      temp.push(obj[key]);
    }
  }
  output.push(temp.join(','));
  if (!obj.children.length) {
    return;
  } else {
   for (var i = 0; i < obj.children.length; i++) {
     counter++;
     getKids(obj.children[i]);
   }
  }
}

var getCSV = function(obj) {
  var csv;
  getKeys(obj);
  getKids(obj);
  csv = output.join('\n');
  output = [];
  counter = 1;
  return csv;
}

exports.getCSV = getCSV;