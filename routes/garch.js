var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('garch', {title: 'Garch'})
});

router.post('/python', function(req, res){
	var PythonShell = require('python-shell');
	var options = {
  		mode: 'text',
  		pythonOptions: ['-u'],
  		scriptPath: './python/quant/garch/',
  		args: [req.body.t, req.body.s, req.body.e, req.body.bs, req.body.be, req.body.method]
	};
 
	PythonShell.run('garch.py', options, function (err, results) {
      console.log(err);
  		if (err) res.send(['Something went wrong.', 'dummyVal']);
      else res.send(results);
	});
});

router.post('/forecast', function(req, res){
  var PythonShell = require('python-shell');
  var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python/quant/garch/',
      args: [req.body.t, req.body.s, req.body.e, req.body.bs, req.body.be, req.body.method, req.body.d]
  };
 
  PythonShell.run('garch.py', options, function (err, results) {
      console.log(err);
      if (err) res.send(['Something went wrong.', 'dummyVal']);
      else res.send(results);
  });
});


module.exports = router;
