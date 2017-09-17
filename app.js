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

app.get('/landingpage', function(req, res){
	res.render('landingpage')
})

app.get('/mainpage/:mood', function (req, res) {
	var collection = db.collection('menu');
	collection.find({},{},function(e,docs){
	var menu = docs[0]['menu'];
	var categories = [];
	var mood = 7;
	for(var i = 0; i<menu.length;i++){
		var category = menu[i]['type'];
		if(!categories.includes(category)) {
            categories.push(category);
        }
	}
	for(var i = 0;i<menu.length;i++){
		if(menu[i]['mood']==mood){
			menu = arraymove(menu,i,0)
		}
	}
	console.log(menu);

	var mainDish = menu[0];
	var otherDishes = menu.slice(1,menu.length+1);

	var viewParameters = {
		categories: categories,
		mainDish: mainDish,
		otherDishes: otherDishes
	}

  	res.render('mainpage', viewParameters)
	});
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

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
};

app.listen(3000, function(){
	console.log("app listening on port 3000!")
})

module.exports = app;
