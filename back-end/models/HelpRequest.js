var mongoose = require('mongoose');

module.exports = mongoose.model('HelpRequest', {
	helprequest: {
		title: String,
		text: String
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});