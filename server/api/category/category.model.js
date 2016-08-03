'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: String,
	products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Category', CategorySchema);