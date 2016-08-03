'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId,
    relationship = require("mongoose-relationship"),
    path = require('path'),
    Product = require(path.resolve('server', 'api/product/product.model'));

var AllocationSchema = new Schema({
	type: Boolean, // room or person
	status: Boolean, // valid ?
	product  : {type : ObjectId, ref : 'Product', childPath: 'allocation'},
	person  : {type : ObjectId, ref : 'Person', childPath: 'allocations'},
	room  : {type : ObjectId, ref : 'Room', childPath: 'allocation'}
});

AllocationSchema.plugin(relationship, { relationshipPathName: ['person', 'product'] });

/**
 * hooks
 */
AllocationSchema
  .post('remove', function(entity) {
    console.log('AllocationSchema.postRemove')
    if(entity.status){ 
        Product.update({_id: entity.product}, {isValide: true}).exec();
    }
  });

module.exports = mongoose.model('Allocation', AllocationSchema);