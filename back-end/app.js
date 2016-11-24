/*require('./api/data/dbconnection.js').open();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var routes = require('./api/routes')

app.set('port', 5000)

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, '../', 'front-end', 'src')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(bodyParser.json());

var server = app.listen(app.get('port'), function() {
	console.log("listening on port", server.address().port);
});*/