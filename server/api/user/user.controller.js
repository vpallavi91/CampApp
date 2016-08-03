'use strict';

var _ = require('lodash');
var path = require('path');
var User = require(path.resolve('server', 'api/user/user.model'));
var mongoose = require('mongoose');
var passport = require('passport');
var config = require(path.resolve('server', 'config/environment'));
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

// Get list of persons
exports.index = function(req, res) {
  var keyword = {$regex: new RegExp(req.query.keyword,'i')};
  var where = {$or: [{lastName: keyword}, {firstName: keyword}, {username: keyword}, {email: keyword}]};
  var orderBy = req.query.orderBy;
  User.find(where)
    .select('-salt -hashedPassword')
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .sort({orderBy: req.query.orderDir})
    .exec(function(err, users) {
        User.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
          res.json(200, users);
        })
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    res.json(200, newUser);
  });
};

/**
 * Updates an existing user
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, '-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

//deletes a user
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return handleError(res, err);
    return res.send(204);
  });
};

//delete multiple products from the DB
exports.deletemultiple = function(req, res) {
  var ids = getObjectIds(req.body.ids);
  User.remove({ _id: { $in: ids } }, function (err) {
    if(err) { return handleError(res, err); }
    res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var user = req.user;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  if(user.authenticate(oldPass)) {
    user.password = newPass;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  } else {
    res.send(403);
  }
};

/**
 * enable disable users
 */
exports.activate = function(req, res, next) {
  var ids = getObjectIds(req.body.ids),
      state = req.params.activated === '1';
  User.update( {_id : { $in: ids }}, {activated: state} , {multi: true} , function(err) { 
    return res.json(200);
  });
};

/**
 * update user roles
 */
exports.authorize = function(req, res, next) {
  User.update( {_id : mongoose.Types.ObjectId(req.body.id)}, {roles: req.body.roles} , function(err) { 
    return res.json(200);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Register
 */
exports.register = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function getObjectIds(ids){
  return ids.map(function(id){
    return mongoose.Types.ObjectId(id);
  });
}