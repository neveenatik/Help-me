'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = require('./user'),
  errorHandler = require(path.resolve('./lib/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.user);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.user;

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.helpCategory = req.body.helpCategory;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        user: errorHandler.getErrorUser(err)
      });
    } else {
      res.json(user);
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
      res.json(user);
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
