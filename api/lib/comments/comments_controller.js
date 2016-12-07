'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Comment = require('./comment'),
  User = require('../users/user'),
  _ = require('lodash');
/**
 * Create a comment
 */
exports.create = function(req, res) {
  var comment = new Comment(req.body.comment);
  comment.user._id = req.userId;
  comment.helpRequest = (req.body.helpRequest);
  User.findById(req.userId).then(function(user, err) {
    if (err) {
      return res.status(404).send({
        message: 'Could not get user Information'
      })
    }
    comment.user.displayName = user.displayName;
    comment.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: 'Can not create a comment'
        });
      } else {
        res.jsonp(comment);
      }
    });
  });
};

/**
 * Show the current comment
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var comment = req.comment ? req.comment.toJSON() : {};

  // Add a custom field to the comment, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the comment model.
  if (req.userId && comment.user && comment.user._id) {
    comment.isCurrentUserOwner = comment.user._id.toString() === req.userId.toString();
  }
  res.jsonp(comment);
};

/**
 * Update a comment
 */
exports.update = function(req, res) {
  var comment = req.comment;

  comment = _.extend(comment, req.body.comment);

  comment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not update the comment'
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * Delete an comment
 */
exports.delete = function(req, res) {
  var comment = req.comment;

  comment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: 'Could not delete the comment'
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * List of Comments
 */
exports.list = function(req, res) {
  Comment.find().sort('-created').exec(function(err, comments) {
    if (err) {
      return res.status(400).send({
        message: 'Could not retrieve comments for this help request'
      });
    } else {
      res.json(comments);
    }
  });
};

/**
 * List of Comments for one help request
 */
exports.listOneHelpRequest = function(req, res) {
  Comment.find({ 'helpRequest': req.helprequest_id }).sort('-created').populate('user', 'displayName').exec(function(err, comments) {
    if (err) {
      return res.status(400).send({
        message: 'Could not retrieve comments for this help request'
      });
    } else {
      res.json(comments);
    }
  });
};

/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Comment is invalid'
    });
  }

  Comment.findById(id).populate('user', 'displayName').exec(function(err, comment) {
    if (err) {
      return next(err);
    } else if (!comment) {
      return res.status(404).send({
        message: 'No comment with that identifier has been found'
      });
    }
    req.comment = comment;
    next();
  });
};
