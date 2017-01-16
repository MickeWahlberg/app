var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
	res.render('test', {title: 'Test'})
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

router.post('/hello', function(req, res){
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
  		res.send(results);
	});
});


module.exports = router;
