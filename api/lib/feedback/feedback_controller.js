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
exports.create = function(req, res) {
  var feedback = new FeedBack(req.body.feedback);
  feedback.user = req.body.user;
  feedback.helpRequest = req.body.helpRequest;
  feedback.save(function(err) {
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
 * Show the mean feedback
 */
exports.readByUser = function(req, res) {
  FeedBack.find({ 'user': req.user._id }).exec(function(err, feedback) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get the feedback for this user'
      });
    } else {
      var mean = 0;
      for (var i = 0; i < feedback.length; i++) {
        mean += feedback[i].rating;
      }
      mean = mean / (feedback.length - 1);
      res.json({ 'rate': mean, 'feedback': feedback});
    }
  });
};

/**
 * Show the feedback over helpRequest
 */
exports.readByHelpRequest = function(req, res) {
  FeedBack.find({ 'helpRequest': req.helpRequest._id }).exec(function(err, feedback) {
    if (err) {
      return res.status(400).send({
        message: 'Faild to get the feedback for this user'
      });
    } else {
      res.json(feedback);
    }
  });
};


/**
 * Update a feedback
 */
exports.update = function(req, res) {
  var feedback = req.feedback;

  feedback = _.extend(feedback, req.body.feedback);
  feedback.save(function(err) {
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
exports.delete = function(req, res) {
  var feedback = req.feedback;

  feedback.remove(function(err) {
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
 * FeedBack middleware
 */
exports.feedbackByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'FeedBack is invalid'
    });
  }

  FeedBack.findById(id).populate('user', 'displayName').exec(function(err, feedback) {
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
