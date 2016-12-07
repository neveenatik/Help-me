'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * FeedBack Schema
 */
var FeedBackSchema = new Schema({
  comment: {
    type: String,
    default: '',
    trim: true
  },
  rating: {
    type: Number
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  helpRequest: {
    type: Schema.ObjectId,
    ref: 'helpRequest'
  }
});

module.exports = mongoose.model('FeedBack', FeedBackSchema);
