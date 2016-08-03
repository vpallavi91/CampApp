'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/person/person.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));

var router = express.Router();

router.get('/', auth.hasRole('person.show'), controller.index);
router.get('/:id', auth.hasRole('person.show'), controller.show);
router.post('/', auth.hasRole('person.create'), controller.create);
router.put('/:id', auth.hasRole('person.update'), controller.update);
router.patch('/:id', auth.hasRole('person.update'), controller.update);
router.delete('/:id', auth.hasRole('person.delete'), controller.destroy);
router.post('/deletemultiple', auth.hasRole('person.delete'), controller.deletemultiple);

module.exports = router;