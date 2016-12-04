'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  FeedBack = require('./feedback'),
  _ = require('lodash');
/**
 * Create a feedback
 */
exports.create = function (req, res) {
  var feedback = new FeedBack(req.body.feedback);
  feedback.user.id = req.userId;
  feedback.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not save this feedback'
      });
    } else {
      res.jsonp(feedback);
    }
  });
};

/**
 * Show the current feedback
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var feedback = req.feedback ? req.feedback.toJSON() : {};

  // Add a custom field to the feedback, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the feedback model.
  feedback.isCurrentUserOwner = req.userId && feedback.user && feedback.user._id.toString() === req.userId._id.toString();

  res.jsonp(feedback);
};

/**
 * Update a feedback
 */
exports.update = function (req, res) {
  var feedback = req.feedback;

  feedback = _.extend(feedback, req.body.feedback);
  feedback.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not update the feedback'
      });
    } else {
      res.jsonp(feedback);
    }
  });
};

/**
 * Delete an feedback
 */
exports.delete = function (req, res) {
  var feedback = req.feedback;

  feedback.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not delete the feedback'
      });
    } else {
      res.jsonp(feedback);
    }
  });
};

/**
 * List of FeedBacks for one user
 */
exports.listOneUser = function (req, res) {
  FeedBack.find({'user': req.user._id}).sort('-created').populate('user', 'displayName').exec(function (err, feedbacks) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get feedbacks for this user'
      });
    } else {
      res.json(feedbacks);
    }
  });
};

/**
 * FeedBack middleware
 */
exports.feedbackByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'FeedBack is invalid'
    });
  }

  FeedBack.findById(id).populate('user', 'displayName').exec(function (err, feedback) {
    if (err) {
      return next(err);
    } else if (!feedback) {
      return res.status(404).send({
        message: 'No feedback with that identifier has been found'
      });
    }
    req.feedback = feedback;
    next();
  });
};
