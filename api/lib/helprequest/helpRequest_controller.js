'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  HelpRequest = require('./helprequest'),
  _ = require('lodash');
/**
 * Create a helpRequest
 */
exports.create = function (req, res) {
  var helpRequest = new HelpRequest(req.body.helprequest);
  helpRequest.user.id = req.userId;
  helpRequest.user.name = req.userName;
  helpRequest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not save this help request'
      });
    } else {
      res.jsonp(helpRequest);
    }
  });
};

/**
 * Show the current helpRequest
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var helpRequest = req.helpRequest ? req.helpRequest.toJSON() : {};

  // Add a custom field to the helpRequest, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the helpRequest model.
  helpRequest.isCurrentUserOwner = req.userId && helpRequest.user && helpRequest.user._id.toString() === req.userId._id.toString();

  res.jsonp(helpRequest);
};

/**
 * Update a helpRequest
 */
exports.update = function (req, res) {
  var helpRequest = req.helpRequest;

  helpRequest = _.extend(helpRequest, req.body.helprequest);
  helpRequest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not update the help request'
      });
    } else {
      res.jsonp(helpRequest);
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
        message: 'Could not delete the help request'
      });
    } else {
      res.jsonp(helpRequest);
    }
  });
};

/**
 * List of HelpRequests
 */
exports.list = function (req, res) {
  HelpRequest.find({'done': false}).sort('-created').populate('user', 'displayName').exec(function (err, helpRequests) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get help rquests list'
      });
    } else {
      res.json(helpRequests);
    }
  });
};

/**
 * List of HelpRequests for one user
 */
exports.listOneUser = function (req, res) {
  HelpRequest.find({'user': req.user._id}).sort('-created').populate('user', 'displayName').exec(function (err, helpRequests) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get help rquests for this user'
      });
    } else {
      res.json(helpRequests);
    }
  });
};

/**
 * List of Done HelpRequests
 */
exports.listDone = function (req, res) {
  HelpRequest.find({'done':true}).sort('-created').populate('user', 'displayName').exec(function (err, helpRequests) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get the finished help rquests'
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
