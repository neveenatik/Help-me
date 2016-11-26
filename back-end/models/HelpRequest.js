var mongoose = require('mongoose');

module.exports = mongoose.model('HelpRequest', {
	helprequest: {
		category: String,
		description: String
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});