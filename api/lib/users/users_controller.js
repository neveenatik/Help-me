'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = require('./user'),
  _ = require('lodash');
/**
 * Show the current user
 */
exports.read = function (req, res) {
   // convert mongoose document to JSON
  var user = req.userById ? req.userById.toJSON() : {};

  // Add a custom field to the user, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the user model.
  user.isCurrentUserOwner = req.user && user && user._id.toString() === req.user._id.toString();

  res.jsonp(user);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.userById;
  user = _.extend(user, req.body.user);
  user.displayName = user.firstName + ' ' + user.lastName;
  
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'User could not be updated'
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
  var user = req.userById;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'User could not be deleted'
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
        message: "Cann't list users"
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
      message: 'User is invalid'
    });
  }

  User.findById(id).populate('user', 'displayName').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.status(404).send({
        message: 'No user with that identifier has been found'
      });
    }
    req.user = user;
    next();
  });
};
