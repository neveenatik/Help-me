'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Helper = require('./helper'),
  _ = require('lodash');
/**
 * Create a helper
 */
exports.assign = function(req, res) {
  var helper = new Helper(req.body.helper);

  helper.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not assign this helper'
      });
    } else {
      res.jsonp(helper);
    }
  });
};

/**
 * Show the helprequests fo helper
 */
exports.getByHelper = function(req, res) {
  Helper.find({ 'user': req.user._id }).exec(function(err, helper) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get the helping pairs for this user'
      });
    } else {
      res.json(helper);
    }
  });
};

/**
 * Show the helper by helpRequest
 */
exports.getByHelpRequest = function(req, res) {
  Helper.find({ 'helpRequest': req.helpRequest._id }).exec(function(err, helper) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get the helper for this help request'
      });
    } else {
      res.json(helper);
    }
  });
};

/**
 * Delete an helper
 */
exports.unAssign = function(req, res) {
  var helper = req.helper;

  helper.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not un assign the helper'
      });
    } else {
      res.jsonp(helper);
    }
  });
};

/**
 * Helper middleware
 */
exports.helperByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Helper is invalid'
    });
  }

  Helper.findById(id).populate('user', 'displayName').exec(function(err, helper) {
    if (err) {
      return next(err);
    } else if (!helper) {
      return res.status(404).send({
        message: 'No helper with that identifier has been found'
      });
    }
    req.helper = helper;
    next();
  });
};
