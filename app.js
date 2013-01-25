/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , routes = require('./routes')
  //, mongodb = require('mongodb')
  , mongoose = require('mongoose');

var user                  = 'synapsis';
var pass                  = 'milesrocks';
var basicAuthMessage = 'Restricted area, please identify';

//var server = new mongodb.Server('127.0.0.1', 27017);
var db = mongoose.createConnection('mongodb://nodejitsu:db20fc3eeb193c9189457c7f9fafe80e@linus.mongohq.com:10002/nodejitsudb8942125844');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('You have successfully accessed your database.');
});

var Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  year: { type: String, required: true },
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
  date: { type: Date, default: Date.now() }
});

var User = db.model('User', Schema);


var app = express();

//Basic Auth
var basicAuth = express.basicAuth(function(username, password) {
  return (username === user && password === pass);
}, basicAuthMessage);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('/', routes.landingPage);
app.get('/student', routes.student);
app.get('/company', routes.company);
app.get('/lp', function(req, res) {
  res.render('landing-page', { title: "landing Page"});
});
app.post('/', function(req, res){

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    year: req.body.year,
    mail: req.body.mail,
    region: req.body.region,
    phone: req.body.phone,
    car_accessible: req.body.car_accessible,
    commuter: req.body.commuter,
    car_location: req.body.car_location,
    car_make: req.body.car_make,
    car_model: req.body.car_model,
    car_year: req.body.car_year,
    weekly_miles: req.body.weekly_miles
  });

  user.save(function(err, user) {
    if (err)
      console.log(err);
    else
      console.log(user.name + ' saved to the database!');
  });

  res.end();
});

app.get('/admin', basicAuth, function(req, res) {

  User.find(function (err, users) {
    if (err) throw(err);
    res.render('admin', { users: users });
  })
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});