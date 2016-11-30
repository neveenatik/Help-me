'use strict';
/*
 * PACKAGES ====================================================================
 */
var express = require('express');

var bodyParser = require('body-parser');

var cors = require('./lib/services/cors');

var routes = require('./lib/routes');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var app = express();

//Middlewares

app.use(bodyParser.json());

app.use(cors);

app.use(routes);

//Connection
mongoose.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    } else {
    	console.log('Error connecting to DB');
    }
});

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
});

module.exports = app;