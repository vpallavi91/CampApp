'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/product/product.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));

var router = express.Router();

router.get('/', auth.hasRole('product.show'), controller.index);
router.get('/:id', auth.hasRole('product.show'), controller.show);
router.post('/', auth.hasRole('product.create'), controller.create);
router.put('/:id', auth.hasRole('product.update'), controller.update);
router.patch('/:id', auth.hasRole('product.update'), controller.update);
router.delete('/:id', auth.hasRole('product.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('product.delete'), controller.deletemultiple);
router.post('/createmultiple', auth.hasRole('product.delete'), controller.createmultiple);
module.exports = router;