'use strict';

var _ = require('lodash');
var path = require('path');
var Allocation = require(path.resolve('server', 'api/allocation/allocation.model'));
var mongoose = require('mongoose');
var Person = require(path.resolve('server', 'api/person/person.model'));
var Product = require(path.resolve('server', 'api/product/product.model'));

// Get list of allocations
exports.index = function(req, res) {
  req.query = _.merge({page: 1, perPage: 20, keyword : '', orderBy: '_id', orderDir:'asc'}, req.query);
  if(req.query.keyword !== ''){
    var keyword = {$regex: new RegExp(req.query.keyword,'i')};
    Person.find({$or: [{lastName: keyword}, {firstName: keyword}, {code: keyword}, {city: keyword}]})
    .select('_id')
    .exec(function(err, persons){
      req.query.personIds = persons.map(function(entity){
        return entity._id;
      });
      Product.find({name: keyword})
      .select('_id')
      .exec(function(err, products){
        req.query.productIds = products.map(function(entity){
          return entity._id;
        });
        search(req, res);
      });
    });
  }else{
    search(req, res);
  }
};

//get by the product id
exports.byproduct = function(req, res) {
 Allocation.find( {
      product :{_id:mongoose.Types.ObjectId(req.query.productId)}
    },function (err, allocation) {
    if(err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    return res.json(allocation);
  });
};

// Get a single allocation
exports.show = function(req, res) {
  Allocation.findById(req.params.id)
    .populate('product')
    .populate('person')
    .exec(function (err, allocation) {
      if(err) { return handleError(res, err); }
      if(!allocation) { return res.send(404); }
      var categoryPath = {
        path: 'product.category',
        model: 'Category'
      };
      Allocation.populate(allocation, categoryPath, function (err, allocation) {
        return res.json(allocation);
      });
    });
};

// Creates a new allocation in the DB.
exports.create = function(req, res) {
  Allocation.create(req.body, function(err, allocation) {
    if(err) { return handleError(res, err); }
    return res.json(201, allocation);
  });
};

// Updates an existing allocation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Allocation.findById(req.params.id, function (err, allocation) {
    if (err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    var updated = _.merge(allocation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, allocation);
    });
  });
};

// Deletes a allocation from the DB.
exports.destroy = function(req, res) {
  Allocation.findById(req.params.id, function (err, allocation) {
    if(err) { return handleError(res, err); }
    if(!allocation) { return res.send(404); }
    allocation.remove(function(err) {
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
  Allocation.find({ _id: { $in: ids } }, function (err, result) {
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

function search(req, res) {
  var where = [{}];
  if(req.query.status === 1){
    where.push({status: true});
  }else if(req.query.status === 2) {
    where.push({status: false});
  }
  if(req.query.personIds){
    where.push({$or: [{person: { $in : req.query.personIds}}, {product: { $in : req.query.productIds}}]});
  }
  Allocation.find({$and: where})
    .sort([[req.query.orderBy, req.query.orderDir]])
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .populate('person')
    .populate('product')
    .exec(function(err, allocation) {
        Allocation.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
          res.json(200, allocation);
        });
    });
}