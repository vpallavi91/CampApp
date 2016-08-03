'use strict';

var _ = require('lodash');
var path = require('path');
var Reclamation = require(path.resolve('server', 'api/reclamation/reclamation.model'));

// Get list of reclamations
exports.index = function(req, res) {
  Reclamation.find(function (err, reclamations) {
    if(err) { return handleError(res, err); }
    return res.json(200, reclamations);
  });
};

// Get a single reclamation
exports.show = function(req, res) {
  Reclamation.findById(req.params.id, function (err, reclamation) {
    if(err) { return handleError(res, err); }
    if(!reclamation) { return res.send(404); }
    return res.json(reclamation);
  });
};

// Creates a new reclamation in the DB.
exports.create = function(req, res) {
  Reclamation.create(req.body, function(err, reclamation) {
    if(err) { return handleError(res, err); }
    return res.json(201, reclamation);
  });
};

// Updates an existing reclamation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reclamation.findById(req.params.id, function (err, reclamation) {
    if (err) { return handleError(res, err); }
    if(!reclamation) { return res.send(404); }
    var updated = _.merge(reclamation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reclamation);
    });
  });
};

// Deletes a reclamation from the DB.
exports.destroy = function(req, res) {
  Reclamation.findById(req.params.id, function (err, reclamation) {
    if(err) { return handleError(res, err); }
    if(!reclamation) { return res.send(404); }
    reclamation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}