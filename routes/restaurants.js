var express = require('express');
var router = express.Router();

router.post('/addrestaurant', function(req,res){
  var db = req.db;
  var collection = db.get('restaurants');
  collection.insert(req.body, function(err, result){
      res.send(
          (err === null) ? { msg: '' } : { msg: err }
      );
  });
});

router.get('/getrestaurant',function(req,res){
  var db = req.db;
  var collection = db.get('restaurants');
  collection.find({},{},function(e,docs){
      res.json(docs);
      console.log(docs);
  });
});

router.get('/findrestauranttablelist/:restaurantId',function(req,res){
    var db = req.db;
    var collection = db.get('restaurants');
    var userToFind = parseInt(req.params.restaurantId);
    collection.find({"restaurantId": userToFind}, function(e,docs) {
        res.json(docs);
    });
});

module.exports = router;
