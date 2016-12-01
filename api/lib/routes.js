'use strict';

//packages
var express = require('express'),
	auth = require('./auth/auth'),
	checkAuthenticated = require('./services/checkAuthenticated'),
	users = require('./users/users_controller'),
	messages = require('./messages/messages_controller'),
	helpRequests = require('./helprequest/helpRequest_controller');

//====== Start routing ========
var router = express.Router();

//========= authentication ====

router.post('/auth/signup', auth.register);
router.post('/auth/login', auth.login);
router.get('/auth/signout', auth.signout);

//======== Users ========

router.get('/api/user/:userId', checkAuthenticated, users.list); //display his profile and the others profile
router.put('/api/user/:userId', checkAuthenticated, users.update); // update his profile
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
router.get('/api/helprequests', helpRequests.list)
	.post('/api/helprequests', checkAuthenticated, helpRequests.create)
	.get('/api/helprequests/:helpRequestId', helpRequests.read)
	.put('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.update)
	.delete('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.delete);
router.param('helpRequestId', helpRequests.helpRequestByID);





module.exports = router;
