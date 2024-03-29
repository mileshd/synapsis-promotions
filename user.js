
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/users');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('You have successfully accessed your database.');
});

var Schema = mongoose.Schema;

var User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  class_year: { type: String, required: true },
  mail: { type: String, required: true },
  region: { type: String, required: true },
  phone: { type: String, required: true },
  car_accessible: { type: String, required: true },
  commuter: { type: String, required: true },
  car_location: { type: String, required: true },
  car_make: { type: String },
  car_model: { type: String },
  car_year: { type: Number },
  weekly_miles: { type: Number, required: true },
  date: { type: Date, default: Date.now.toString() }
});