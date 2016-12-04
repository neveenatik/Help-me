'use strict';

//packages
var express = require('express'),
	auth = require('./auth/auth'),
	checkAuthenticated = require('./services/checkAuthenticated'),
	users = require('./users/users_controller'),
	comments = require('./comments/comments_controller'),
	helpRequests = require('./helprequest/helprequest_controller');

//====== Start routing ========
var router = express.Router();

//========= authentication ====

router.post('/auth/signup', auth.register);//register new user and later he can update his profile.
router.post('/auth/login', auth.login);// logingin and getting token

//======== Users ========

router.get('/api/users', checkAuthenticated, users.list)//user can see other users
	.get('/api/users/:userId', checkAuthenticated, users.read) //display one user to see his profile
	.put('/api/users/:userId', checkAuthenticated, users.update)//update user profile
	.delete('/api/users/:userId', checkAuthenticated, users.delete);//user can delete his account for now /later can change that.
router.param('userId', users.userByID);

//========= Messages =======
router.get('/api/comments',checkAuthenticated, comments.list) 
	.post('/api/comments', checkAuthenticated, comments.create)
	.get('/api/comments/:commentId', checkAuthenticated, comments.read)
	.put('/api/comments/:commentId', checkAuthenticated, comments.update)
	.delete('/api/comments/:commentId', checkAuthenticated, comments.delete);
router.param('commentId', comments.commentByID);

//========= HelpRequest =======
router.get('/api/helprequests', helpRequests.list)
	.get('/api/helprequests/done', checkAuthenticated, helpRequests.listDone)
	.post('/api/helprequests', checkAuthenticated, helpRequests.create)
	.get('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.read)
	.put('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.update)
	.delete('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.delete);
router.param('helpRequestId', helpRequests.helpRequestByID);


module.exports = router;
