'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * HelpRequest Schema
 */
var HelpRequestSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  done: Boolean
});

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);
