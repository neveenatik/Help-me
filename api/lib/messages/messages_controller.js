'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = require('./message'),
  errorHandler = require(path.resolve('./lib/errors.server.controller'));
/**
 * Create a message
 */
exports.create = function (req, res) {
  var message = new Message(req.body);
  message.user = req.user;

  message.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * Show the current message
 */
exports.read = function (req, res) {
  res.json(req.message);
};

/**
 * Update a message
 */
exports.update = function (req, res) {
  var message = req.message;

  message.content = req.body.content;

  message.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * Delete an message
 */
exports.delete = function (req, res) {
  var message = req.message;

  message.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * List of Messages
 */
exports.list = function (req, res) {
  Message.find().sort('-created').populate('user', 'displayName').exec(function (err, messages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(messages);
    }
  });
};

/**
 * Message middleware
 */
exports.messageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Message is invalid'
    });
  }

  Message.findById(id).populate('user', 'displayName').exec(function (err, message) {
    if (err) {
      return next(err);
    } else if (!message) {
      return res.status(404).send({
        message: 'No message with that identifier has been found'
      });
    }
    req.message = message;
    next();
  });
};
