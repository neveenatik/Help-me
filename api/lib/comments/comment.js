'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    _id: {
      type: Schema.ObjectId
    },
    displayName: {
      type: String
    }
  },
  helpRequest: {
    type: Schema.ObjectId,
    ref: 'helpRequest'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
