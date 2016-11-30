
'use strict';

//packages
var express = require('express');

var auth = require('./auth/auth');
var checkAuthenticated = require('./services/checkAuthenticated');
var users = require('./users/users_controller');
var messages = require('./messages/messages_controller');
var helpRequest = require('./helprequest/helpRequest_controller');

//====== Start routing ========
var router = express.Router();

//========= authentication ====

router.post('/api/auth/signup', auth.register);
router.post('/api/auth/login', auth.login);
router.get('/api/auth/signout', auth.signout);

//======== Users ========

router.get('/api/user/:userId', checkAuthenticated, users.list);//display his profile and the others profile
router.put('/api/profile', checkAuthenticated, users.update);// update his profile
/*
router.get('/api/auth/signout', auth.signout);*/

//========= Messages =======
router.get('/api/messages', messages.list)
	.post('/api/messages', checkAuthenticated, messages.create)
	.get('/api/messages/:messageId', messages.read)
	.put('/api/messages/:messageId', checkAuthenticated, messages.update)
	.delete('/api/messages/:messageId', checkAuthenticated, messages.delete);
router.param('messageId', messages.messageByID);

//========= HelpRequest =======
router.get('/api/helpRequest', helpRequest.list)
	.post('/api/helpRequest', checkAuthenticated, helpRequest.create)
	.get('/api/helpRequest/:helpRequestId', helpRequest.read)
	.put('/api/helpRequest/:helpRequestId', checkAuthenticated, helpRequest.update)
	.delete('/api/helpRequest/:helpRequestId', checkAuthenticated, helpRequest.delete);
//router.param('messageId', helpRequest.messageByID);





module.exports = router;
