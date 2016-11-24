/*var dbconn = require('../data/dbconnection.js');
var requestData = require('../data/request-data.json');

// Get all with paginaiton 
module.exports.helpRequestsGetAll = function(req, res) {

	var db = connect.get();

	console.log("db", db); 

	console.log('GET json');
	console.log(req.query);

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	var returnData = requestData.slice(offset, offset + count);

	res
		.status(200)
		.json(returnData);
};

// Get one 
module.exports.helpRequestsGetOne = function(req, res) {
	var helpRequestId = req.params.helpRequestId;
	console.log(helpRequestId);
	var thisRequest = requestData[helpRequestId];
	console.log('GET helpRequestId', helpRequestId);
	res
		.status(200)
		.json(thisRequest);
};

// Add a help request
module.exports.helpRequestsAddOne = function(req, res) {
	console.log('POST a new help request');
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};*/