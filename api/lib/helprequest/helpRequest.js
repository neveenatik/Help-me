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
  done: {
    type: Boolean,
    default: false
  },
  user: {
    _id: {
      type: Schema.ObjectId
    },
    displayName: {
      type: String
    },
    city: {
      type: String
    },
    dateOfbirth: {
      type: Date
    }
  }
});

module.exports = mongoose.model('HelpRequest', HelpRequestSchema);
