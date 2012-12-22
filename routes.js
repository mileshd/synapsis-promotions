
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

exports.are = function(req, res) {
	res.render('are',{ title : 'Who We Are' } );
}

exports.do = function(req, res) {
	res.render('do', { title : 'What We Do', color: 'red' } );
}

exports.more = function(req, res) {
	res.render('more', { title : 'Learn More!' } );
}

exports.post = function(req, res) {
  var methods = {};

  var name = req.body.name;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var truck_length = req.body.truck_length;
  var operating_location = req.body.operating_location;

  var Trucker = db.model('Truck', Truck);

  var trucker = new Trucker({
    name: name,
    email: email,
    phone_number: phone_number,
    truck_length: truck_length,
    operating_location: operating_location
  });

  trucker.save(function(err, trucker) {
    if (err)
      console.log(err);
    else
      console.log(trucker.name + ' saved to the database!');
  });

  Trucker.find(function(err, trucks){
      if (err)
        console.log(err);
      console.log(trucks);
    });

  methods.clear = function() {
    trucker.collection.drop();
    console.log('all trucks cleared');
  };
  res.end();
  return methods;
  //res.render('more', { title : 'Learn More!' } );

  // exports.find = function(req, res) {
  //   Trucker.find(function(err, trucks){
  //     if (err)
  //       console.log(err);
  //     console.log(trucks);
  //   });
  // }
  // 
}

