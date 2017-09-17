var express = require('express');
var router = express.Router();

router.post('/additem', function(req,res){
  var db = req.db;
  var collection = db.get('menu');
});

router.get('/getmenu',function(req,res){
  var db = req.db;
  var collection = db.get('menu');
  collection.find({},{},function(e,docs){
      res.json(docs);
      console.log(docs);
  });
});

module.exports = router;
