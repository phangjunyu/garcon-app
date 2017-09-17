var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://admin:admin@ds139964.mlab.com:39964/garcon-db');

var index = require('./routes/index');
var restaurants = require('./routes/restaurants');
var menu = require('./routes/menu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/restaurants', restaurants);
app.use('/menu',menu);

app.get('/mainpage', function (req, res) {

	var mainDish = {
		title: 'Fish & Chips',
		price: '$10',
		description: 'long string njegvwgqwdsg jhadhckjcc ccccccsss ssssssss sssssss ssssssskbsk hdbhksdhkakdbaskdaksdbksab sadkjsakagsdsg',
		image: 'http://www.bizzielizzies.co.uk/wp-content/uploads/2015/03/slide-fish-chips-2015.jpg'
	}
	var otherDish = {
		title: 'Ceasar Salad',
		price: '$7.79',
		description: 'not bad asdfadsf asdf as fasf asf as fasdf asdf asdfasf asdf as fasd f',
		image: 'http://jetspizza.com/dbphotos/display/c161462910486f60cf38484ecf458adf/664/410'
	}
	var otherDishes = []
	for(var i = 0; i < 10; i++){
		otherDishes[i] = otherDish
	}

	var viewParameters = {
		mainDish: mainDish,
		otherDishes: otherDishes
	}

  res.render('mainpage', viewParameters)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){
	console.log("app listening on port 3000!")
})

module.exports = app;
