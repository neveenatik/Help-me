'use strict';

//packages
var express = require('express'),
	auth = require('./auth/auth'),
	checkAuthenticated = require('./services/checkAuthenticated'),
	users = require('./users/users_controller'),
	messages = require('./messages/messages_controller'),
	helpRequests = require('./helprequest/helpRequest_controller');
	//core = require('./core/controllers/core.server.controller');

//====== Start routing ========
var router = express.Router();

//========= authentication ====

router.post('/auth/signup', auth.register);//register new user and later he can update his profile.
router.post('/auth/login', auth.login);// logingin and getting token
router.get('/auth/signout', auth.signout);

//======== Users ========

router.get('/api/users', checkAuthenticated, users.list)//user can see other users
	.get('/api/users/:userId', users.read) //display one user to see his profile
	.put('/api/users/:userId', checkAuthenticated, users.update)//update user profile
	.delete('/api/users/:userId', checkAuthenticated, users.delete);//user can delete his account for now /later can change that.
router.param('userId', users.userByID);

//========= Messages =======
router.get('/api/messages', messages.list) 
	.post('/api/messages', checkAuthenticated, messages.create)
	.get('/api/messages/:messageId', messages.read)
	.put('/api/messages/:messageId', checkAuthenticated, messages.update)
	.delete('/api/messages/:messageId', checkAuthenticated, messages.delete);
router.param('messageId', messages.messageByID);

//========= HelpRequest =======
router.get('/api/helprequests', helpRequests.list)
	.get('/api/helprequests/done', helpRequests.listDone)
	.post('/api/helprequests', checkAuthenticated, helpRequests.create)
	.get('/api/helprequests/:helpRequestId', helpRequests.read)
	.put('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.update)
	.delete('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.delete);
router.param('helpRequestId', helpRequests.helpRequestByID);

//========= Root routing ======

/*router.get('/server-error', core.renderServerError)
	.get('/:url(api|modules|lib)/*', core.renderNotFound)
	.get('/*', core.renderIndex);*/



module.exports = router;
