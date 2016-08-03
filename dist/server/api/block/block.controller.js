'use strict';

var _ = require('lodash');
var path = require('path');
var Block = require(path.resolve('server', 'api/block/block.model'));
var mongoose = require('mongoose');

// Get list of blocks
exports.index = function(req, res) {
  req.query = _.merge({orderBy: 'name', orderDir:'asc'}, req.query);
  var keyword = {$regex: new RegExp(req.query.keyword,'i')};
  Block.find({name: keyword})
    .sort([[req.query.orderBy, req.query.orderDir]])
    .exec(function(err, blocks) {
      if(err) { return handleError(res, err); }
      return res.json(200, blocks);
    });
};

// Get a single block
exports.show = function(req, res) {
  Block.findById(req.params.id)
    .populate('rooms')
    .exec(function (err, block) {
      if(err) { return handleError(res, err); }
      if(!block) { return res.send(404); }
      return res.json(block);
    });
};

// Creates a new block in the DB.
exports.create = function(req, res) {
  Block.create(req.body, function(err, block) {
    if(err) { return handleError(res, err); }
    return res.json(201, block);
  });
};

// Updates an existing block in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Block.findById(req.params.id, function (err, block) {
    if (err) { return handleError(res, err); }
    if(!block) { return res.send(404); }
    var updated = _.merge(block, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, block);
    });
  });
};

// Deletes a block from the DB.
exports.destroy = function(req, res) {
  Block.findById(req.params.id, function (err, block) {
    if(err) { return handleError(res, err); }
    if(!block) { return res.send(404); }
    block.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//delete multiple products from the DB
exports.deletemultiple = function(req, res) {
  var ids = req.body.ids.map(function(id){
    return mongoose.Types.ObjectId(id);
  });
  Block.find({ _id: { $in: ids } }, function (err, result) {
    if(err) { return handleError(res, err); }
    result.forEach(function (item) {
      item.remove();
    });
    res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}