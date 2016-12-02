'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = require('./user'),
  errorHandler = require('../errors.server.controller'),
  _ = require('lodash');
/**
 * Show the current user
 */
exports.read = function (req, res) {
   // convert mongoose document to JSON
  var user = req.user ? req.user.toJSON() : {};

  // Add a custom field to the user, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the user model.
  user.isCurrentUserOwner = req.userId && user.user && user.user._id.toString() === req.userId._id.toString();

  res.jsonp(user);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.user;
  user = _.extend(user, req.body.user);
  user.displayName = user.firstName + ' ' + user.lastName;
  
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        user: errorHandler.getErrorUser(err)
      });
    } else {
      res.jsonp(user);
    }
  });
};

/**
 * Delete an user
 */
exports.delete = function (req, res) {
  var user = req.user;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        user: errorHandler.getErrorUser(err)
      });
    } else {
      res.jsonp(user);
    }
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find().sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        user: errorHandler.getErrorUser(err)
      });
    } else {
      res.json(users);
    }
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      user: 'User is invalid'
    });
  }

  User.findById(id).populate('user', 'displayName').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(404).send({
        user: 'No user with that identifier has been found'
      });
    }
    req.user = user;
    next();
  });
};
