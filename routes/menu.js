var express = require('express');
var router = express.Router();

router.post('/additem', function(req,res){
  var db = req.db;
  var collection = db.get('menu');
  collection.insert(req.body, function(err, result){
      res.send(
          (err === null) ? { msg: '' } : { msg: err }
      );
  });
});

router.get('/getmenu',function(req,res){
  var db = req.db;
  var collection = db.get('menu');
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

module.exports = router;
