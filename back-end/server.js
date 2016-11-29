'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var user = ('./controllers/user');
var helpRequest = require('./controllers/helpRequest');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.get('/api/message', message.get);

//app.get('/api/users', user.getAll);

app.post('/api/message',checkAuthenticated, message.post);

app.post('/auth/register', auth.register);

app.post('/auth/login', auth.login);

app.get('/api/helprequest', helpRequest.get);

app.post('/api/helprequest',checkAuthenticated, helpRequest.post);

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})