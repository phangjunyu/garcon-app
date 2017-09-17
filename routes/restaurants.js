var express = require('express');
var router = express.Router();

router.post('/addrestaurant', function(req,res){
  var db = req.db;
  var collection = db.get('restaurants');
})

router.get('/getrestaurant',function(req,res){
  var db = req.db;
  var collection = db.get('restaurants');
  collection.find({},{},function(e,docs){
      res.json(docs);
      consol
  });

})

module.exports = router;
