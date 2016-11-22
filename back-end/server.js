'use strict';

//==================require======================
var express = require('express');
var bodyParser = require('body-parser'); //help the server to read json files.
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var auth = require('./controllers/auth');
var message = require('./controllers/message');

//==================initiating - middlewares=====
var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});


//========================================

app.post('/api/message', message.post);

app.post('/auth/register', auth.register);

app.get('/api/message', message.get);




//======================================
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
	if (!err) {
		console.log("we are connected to mongodb");
	} else {
		console.log(err);
	}
});


var server = app.listen(5000, function() {
	console.log("listening on port", server.address().port);
});
