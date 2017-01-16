var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('garch', {title: 'Garch'})
});

router.post('/signup', function(req, res){
	console.log('HERE');
	var PythonShell = require('python-shell');
 
	var options = {
  		mode: 'text',
  		pythonOptions: ['-u'],
  		scriptPath: '/Users/mikaelwahlberg/Projects/Node/app/python',
	};
 
	PythonShell.run('script.py', options, function (err, results) {
  		if (err) throw err;
  		console.log('results: %j', results);
  		res.render('test', {
   			title: 'NIGGRO',
   			pythonOut: results
		});
	});
});

router.post('/python', function(req, res){
	var PythonShell = require('python-shell');
	var options = {
  		mode: 'text',
  		pythonOptions: ['-u'],
  		scriptPath: '/Users/mikaelwahlberg/Projects/Node/app/python',
  		args: [req.body.t, req.body.s, req.body.e]
	};
 
	PythonShell.run('plot.py', options, function (err, results) {
  		if (err) throw err;
  		console.log('results: %j', results);
  		console.log(results[1]);

  		res.send(results);
	});
});


module.exports = router;
