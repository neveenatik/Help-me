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
  	displayName:{
  		type: String
  	},
  	_id:{
    type: Schema.ObjectId,
    }
  },
  helpRequest: {
    type: Schema.ObjectId,
    ref: 'helpRequest'
  }
});

module.exports = mongoose.model('Helper', HelperSchema);
