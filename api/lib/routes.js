'use strict';

//packages
var express = require('express'),
	auth = require('./auth/auth'),
	checkAuthenticated = require('./services/checkAuthenticated'),
	users = require('./users/users_controller'),
	comments = require('./comments/comments_controller'),
	helpRequests = require('./helprequest/helprequest_controller'),
	feedback = require('./feedback/feedback_controller');

//====== Start routing ========
var router = express.Router();

// Route Params
router.param('userId', users.userByID);
router.param('commentId', comments.commentByID);
router.param('helpRequestId', helpRequests.helpRequestByID);
//router.param('feedbackId', feedback.feedbackByID);

//========= authentication ====

router.post('/auth/signup', auth.register);//register new user and later he can update his profile.
router.post('/auth/login', auth.login);// logingin and getting token

//======== Users ========

router.get('/api/users', checkAuthenticated, users.list)//user can see other users
	.get('/api/users/:userId', checkAuthenticated, users.read) //display one user to see his profile
	.put('/api/users/:userId', checkAuthenticated, users.update)//update user profile
	.delete('/api/users/:userId', checkAuthenticated, users.delete);//user can delete his account for now /later can change that.

//========= Comments =======
router.get('/api/comments',checkAuthenticated, comments.list)
	.get('/api/comments/helprequest/:helpRequestId',checkAuthenticated, comments.listOneHelpRequest) 
	.post('/api/comments', checkAuthenticated, comments.create)
	.get('/api/comments/:commentId', checkAuthenticated, comments.read)
	.put('/api/comments/:commentId', checkAuthenticated, comments.update)
	.delete('/api/comments/:commentId', checkAuthenticated, comments.delete);

//========= HelpRequest =======
router.get('/api/helprequests', helpRequests.list)
	.get('/api/helprequests/done', checkAuthenticated, helpRequests.listDone)
	.get('/api/helprequests/user/:userId', checkAuthenticated, helpRequests.listOneUser)
	.post('/api/helprequests', checkAuthenticated, helpRequests.create)
	.get('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.read)
	.put('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.update)
	.delete('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.delete);

//========= feedback =======
/*router.post('/api/feedback', checkAuthenticated, feedback.create)
	//.get('/api/feedback', checkAuthenticated, feedback.readAll)
	.get('/api/feedback/user', checkAuthenticated, feedback.read)
	.put('/api/feedback/:feedbackId', checkAuthenticated, feedback.update)
	.delete('/api/feedback/:feedbackId', checkAuthenticated, feedback.delete);*/

module.exports = router;
