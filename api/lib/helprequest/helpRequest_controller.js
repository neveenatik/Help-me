'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  HelpRequest = require('./helpRequest'),
  errorHandler = require(path.resolve('./lib/errors.server.controller'));
/**
 * Create a helpRequest
 */
exports.create = function (req, res) {
  var helpRequest = new HelpRequest(req.body);
  helpRequest.user = req.user;

  helpRequest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorHelpRequest(err)
      });
    } else {
      res.json(helpRequest);
    }
  });
};

/**
 * Show the current helpRequest
 */
exports.read = function (req, res) {
  res.json(req.helpRequest);
};

/**
 * Update a helpRequest
 */
exports.update = function (req, res) {
  var helpRequest = req.helpRequest;

  helpRequest.category = req.body.category;
  helpRequest.title = req.body.title;
  helpRequest.description = req.body.description;

  helpRequest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorHelpRequest(err)
      });
    } else {
      res.json(helpRequest);
    }
  });
};

/**
 * Delete an helpRequest
 */
exports.delete = function (req, res) {
  var helpRequest = req.helpRequest;

  helpRequest.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorHelpRequest(err)
      });
    } else {
      res.json(helpRequest);
    }
  });
};

/**
 * List of HelpRequests
 */
exports.list = function (req, res) {
  HelpRequest.find().sort('-created').populate('user', 'displayName').exec(function (err, helpRequests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorHelpRequest(err)
      });
    } else {
      res.json(helpRequests);
    }
  });
};

/**
 * HelpRequest middleware
 */
exports.helpRequestByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'HelpRequest is invalid'
    });
  }

  HelpRequest.findById(id).populate('user', 'displayName').exec(function (err, helpRequest) {
    if (err) {
      return next(err);
    } else if (!helpRequest) {
      return res.status(404).send({
        message: 'No helpRequest with that identifier has been found'
      });
    }
    req.helpRequest = helpRequest;
    next();
  });
};
