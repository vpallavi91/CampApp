'use strict';

var express = require('express');
var passport = require('passport');
var path = require('path');
var config = require(path.resolve('server', 'config/environment'));
var User = require(path.resolve('server', 'api/user/user.model'));

// Passport Configuration
require(path.resolve('server', 'auth/local/passport')).setup(User, config);

var router = express.Router();

router.use('/local', require(path.resolve('server', 'auth/local')));

module.exports = router;