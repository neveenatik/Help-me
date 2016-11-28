var HelpRequest = require('../models/helpRequest');

module.exports = {
	get: function(req, res) {
		HelpRequest.find({}).populate('user', '-pwd').exec(function(err, result) {
			res.send(result);
		})
	},
	post: function(req, res) {

		req.body.user = req.user;

		var helpRequest = new HelpRequest(req.body);

		helpRequest.save();

		res.status(201);
	}
}
