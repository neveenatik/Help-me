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
router.get('/api/helpRequests', helpRequests.list)
	.post('/api/helpRequests', checkAuthenticated, helpRequests.create)
	.get('/api/helpRequests/:helpRequestId', helpRequests.read)
	.put('/api/helpRequests/:helpRequestId', checkAuthenticated, helpRequests.update)
	.delete('/api/helpRequests/:helpRequestId', checkAuthenticated, helpRequests.delete);
router.param('helprequestId', function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'HelpRequest is invalid'
		});
	}

	HelpRequest.findById(id).populate('user', 'displayName').exec(function(err, helpRequest) {
		if (err) {
			return next(err);
		} else if (!helpRequest) {
			return res.status(404).send({
				message: 'No helpRequest with that identifier has been found'
			});
		}
		console.log(helprequest);
		req.helpRequest = helpRequest;
		next();
	});
});





module.exports = router;
