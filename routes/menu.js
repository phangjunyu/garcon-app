var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/additem', function(req,res){
  var db = req.db;
  var collection = db.get('menu');
})

module.exports = router;
