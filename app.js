/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , routes = require('./routes');


var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('/who-we-are', routes.are);
app.get('/what-we-do', routes.do);
app.get('/learn-more', routes.more);
app.get('/', routes.more);
app.post('/learn-more', routes.post);
app.get('/clear-records', routes.post.methods);

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});