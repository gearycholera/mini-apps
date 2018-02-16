var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bowlingScores');

var schema = mongoose.Schema({name: String, total: Number});
var Scores = mongoose.model('score', schema);



// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';


// const insertDocuments = function(db, callback, obj) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertOne(obj, function(err, result) {
//     console.log("Inserted 1 documents into the collection");
//     callback(result);
//   });
// }

// var connector = function(obj) {
//   MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     const db = client.db(dbName);
//     insertDocuments(db, function(){
//       client.close();
//     }, obj)
//   });
// }

module.exports.Scores = Scores;