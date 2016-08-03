'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId,
    relationship = require("mongoose-relationship"),
    path = require('path'),
    Allocation = undefined;

var ProductSchema = new Schema({
    name: String,
    type: String,
    quantity: { type: Number, min: 0},
    isValide : Boolean,
    category: {type : ObjectId, ref : 'Category', childPath: 'products'},
    allocation: {type : ObjectId, ref : 'Allocation'}
});

ProductSchema.plugin(relationship, { relationshipPathName: 'category' });

/**
 * hooks
 */
ProductSchema
    .post('remove', function(entity) {
        if(entity.allocation){
            getAllocationModel().remove({ _id: entity.allocation }).exec();
        }
    });

function getAllocationModel() {
  if(!Allocation) {
    Allocation = require(path.resolve('server', 'api/allocation/allocation.model'));
  }
  return Allocation;
}

module.exports = mongoose.model('Product', ProductSchema);