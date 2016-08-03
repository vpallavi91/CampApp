'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReclamationSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);