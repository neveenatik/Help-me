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
router.param('feedbackId', feedback.feedbackByID);

//========= authentication ====
router.post('/auth/signup', auth.register); //register new user and later he can update his profile.
router.post('/auth/login', auth.login); // logingin and getting token

//======== Users ========
router.get('/api/users', checkAuthenticated, users.list) //list all users
	.get('/api/users/:userId', checkAuthenticated, users.read) //get one user 
	.put('/api/users/:userId', checkAuthenticated, users.update) //update user profile
	//.delete('/api/users/:userId', checkAuthenticated, users.delete);//user can delete his account for now /later can change that.

//========= Comments =======
//router.get('/api/comments/helprequest/:helpRequestId', checkAuthenticated, comments.listOneHelpRequest) //get comments for one helprequest

	.get('/api/comments',checkAuthenticated, comments.list)
	.post('/api/comments', checkAuthenticated, comments.create) //create a comment on a helprequest
	.get('/api/comments/:commentId', checkAuthenticated, comments.read) //get comment by ID
	.put('/api/comments/:commentId', checkAuthenticated, comments.update) //update a comment 
	.delete('/api/comments/:commentId', checkAuthenticated, comments.delete); // delete a comment

//========= HelpRequest =======
router.get('/api/helprequests', helpRequests.list) // get all unfinished helprequests
	.get('/api/helprequests/done', checkAuthenticated, helpRequests.listDone) //get all finished helprequests
	.get('/api/helprequests/user/:userId', checkAuthenticated, helpRequests.listOneUser) // get all helprequests for one user
	.post('/api/helprequests', checkAuthenticated, helpRequests.create) //create a help request
	.get('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.read) // get help request by Id
	.put('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.update) //update help request
	.delete('/api/helprequests/:helpRequestId', checkAuthenticated, helpRequests.delete); //delete help request

//========= feedback =======
router.post('/api/feedback', checkAuthenticated, feedback.create)
	.get('/api/feedback/helprequest/:helpRequestId', checkAuthenticated, feedback.readByHelpRequest)
	.get('/api/feedback/user/:userId', checkAuthenticated, feedback.readByUser)
	.put('/api/feedback/:feedbackId', checkAuthenticated, feedback.update)
	.delete('/api/feedback/:feedbackId', checkAuthenticated, feedback.delete);

module.exports = router;
