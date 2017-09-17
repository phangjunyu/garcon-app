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
})

router.get('/getrestaurant',function(req,res){
  var db = req.db;
  var collection = db.get('restaurants');
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
})

router.get('findrestauranttablelist/:id',function(req,res){
    var db = req.db;
    var collection = db.get('restaurants');
    var userToFind = req.params.id;
    collection.findOne({ 'restaurantId' : userToFind },{'tableList':1}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
})

module.exports = router;
