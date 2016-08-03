'use strict';

var _ = require('lodash');
var path = require('path');
var mongoose = require('mongoose');
var Product = require(path.resolve('server', 'api/product/product.model'));

// Get list of products
exports.index = function(req, res) {
  var keyword = {$regex: new RegExp(req.query.keyword,'i')};
  var where = [{name: keyword}];
  if(req.query.category){
    where.push({category: {_id: mongoose.Types.ObjectId(req.query.category)}});
  }

  Product.find({$and: where})
    .sort([[req.query.orderBy, req.query.orderDir]])
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .populate('category')
    .exec(function(err, products) {
        Product.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
          res.json(200, products);
        });
    });
};


// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id)
    .populate('category')
    .populate('allocation')
    .exec(function (err, product) {
      if(err) { return handleError(res, err); }
      if(!product) { return res.send(404); }
      Product.populate(product, {path: 'allocation.person', model: 'Person'}, function (err, product) {
        return res.json(product);
      });
    });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    product.remove(function(err) {
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
  Product.find({ _id: { $in: ids } }, function (err, result) {
    if(err) { return handleError(res, err); }
    result.forEach(function (item) {
      item.remove();
    });
    res.send(204);
  });
};

// Creates multiple products in the DB.
exports.createmultiple = function(req, res) {
  res.send(201);
};

function handleError(res, err) {
  return res.send(500, err);
}