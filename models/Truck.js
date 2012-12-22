var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/trucks');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('You have successfully accessed your database.');
});

var Schema = mongoose.Schema;

var Truck = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  truck_length: { type: Number, required: true },
  operating_location: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Trucker.find(function(err, trucks){
//   if (err)
//     console.log(err)
//   console.log(trucks)
// });