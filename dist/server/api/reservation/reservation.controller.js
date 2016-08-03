'use strict';

var _ = require('lodash');
var path = require('path');
var Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));
var Room = require(path.resolve('server', 'api/room/room.model'));
var Person = require(path.resolve('server', 'api/person/person.model'));

// Get list of reservations
exports.index = function(req, res) {
  req.query = _.merge({page: 1, perPage: 20, keyword : '', orderBy: 'datePayement', orderDir:'asc'}, req.query);
  if(req.query.keyword !== ''){
    var keyword = {$regex: new RegExp(req.query.keyword,'i')};
    Person.find({$or: [{lastName: keyword}, {firstName: keyword}, {code: keyword}, {city: keyword}]})
    .select('_id')
    .exec(function(err, entities){
      req.query.personIds = entities.map(function(entity){
        return entity._id;
      });
      Room.find({name: keyword})
      .select('_id')
      .exec(function(err, entities){
        req.query.roomIds = entities.map(function(entity){
          return entity._id;
        });
        search(req, res);
      });
    });
  }else{
    search(req, res);
  }
};

// Get a single reservation
exports.show = function(req, res) {
  Reservation.findById(req.params.id)
    .populate('room')
    .populate('person')
    .exec(function (err, reservation) {
      if(err) { return handleError(res, err); }
      if(!reservation) { return res.send(404); }
      var blockPath = {
        path: 'room.block',
        model: 'Block'
      };
      Reservation.populate(reservation, blockPath, function (err, reservation) {
        return res.json(reservation);
      });
    });
};

// Creates a new reservation in the DB.
exports.create = function(req, res) {
  Reservation.create(req.body, function(err, reservation) {
    return res.json(201, reservation);
  });
};

// Updates an existing reservation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reservation.findById(req.params.id, function (err, reservation) {
    if (err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    var updated = _.merge(reservation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reservation);
    });
  });
};

// Deletes a reservation from the DB.
exports.destroy = function(req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    if(err) { return handleError(res, err); }
    if(!reservation) { return res.send(404); }
    reservation.remove(function(err) {
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
  Reservation.find({ _id: { $in: ids } }, function (err, result) {
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
    where.push({$or: [{person: { $in : req.query.personIds}}, {room: { $in : req.query.roomIds}}]});
  }
  Reservation.find({$and: where})
    .sort([[req.query.orderBy, req.query.orderDir]])
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .populate('person')
    .populate('room')
    .exec(function(err, reservations) {
        Reservation.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
          res.json(200, reservations);
        });
    });
}