'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/room/room.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));

var router = express.Router();

router.get('/', auth.hasRole('room.show'), controller.index);
router.get('/:id', auth.hasRole('room.show'), controller.show);
router.post('/', auth.hasRole('room.create'), controller.create);
router.put('/:id', auth.hasRole('room.update'), controller.update);
router.patch('/:id', auth.hasRole('room.update'), controller.update);
router.delete('/:id', auth.hasRole('room.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('room.delete'), controller.deletemultiple);
router.post('/addmultiple', auth.hasRole('room.create'), controller.addmultiple);

module.exports = router;