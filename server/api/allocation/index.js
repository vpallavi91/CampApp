'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/allocation/allocation.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));

var router = express.Router();


router.get('/', controller.index);
router.get('/byproduct', auth.hasRole('allocation.show'), controller.byproduct);
router.get('/:id', auth.hasRole('allocation.show'), controller.show);
router.post('/', auth.hasRole('allocation.create'), controller.create);
router.put('/:id', auth.hasRole('allocation.update'), controller.update);
router.patch('/:id', auth.hasRole('allocation.update'), controller.update);
router.delete('/:id', auth.hasRole('allocation.delete'), controller.destroy);

module.exports = router;