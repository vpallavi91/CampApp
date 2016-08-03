'use strict';

var express = require('express');
var path = require('path');
var controller = require(path.resolve('server', 'api/config/config.controller'));
var auth = require(path.resolve('server', 'auth/auth.service'));
var router = express.Router();
var multer  = require('multer');
var appConfig = require(path.resolve('server', 'config/environment'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appConfig.client + appConfig.upload.dir)
  },
  filename: function (req, file, cb) {
    console.log('storage.filename', file);
    var ext = file.originalname.substr(file.originalname.indexOf('.'));
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

var upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024}});

router.get('/', controller.index);
router.post('/', upload.single('icon'), controller.update);

module.exports = router;