'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * FeedBack Schema
 */
var HelperSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  helpRequest: {
    type: Schema.ObjectId,
    ref: 'helpRequest'
  }
});

module.exports = mongoose.model('Helper', HelperSchema);
