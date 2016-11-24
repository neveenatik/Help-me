'use strict';

//==================Require======================
var express = require('express');
var bodyParser = require('body-parser'); //help the server to read json files.
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var jwt = require('jwt-simple');
var moment = require('moment');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors')

//==================Initiating - Middlewares=====
var app = express();
app.use(bodyParser.json());
app.use(cors);

//==================Requests======================

app.post('/api/message',checkAuthenticated , message.post);

app.post('/auth/register', auth.register);

app.post('/auth/login', auth.login);

app.get('/api/message', message.get);




//===================starting the connection=======
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
