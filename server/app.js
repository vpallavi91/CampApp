/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');

var config = require(path.resolve('server', 'config/environment'));
var mWindow = global.window;

//check if server is already running
http.get(config.port, config.ip, function(res) {
    console.log('server is running, redirecting to localhost');
    // if (mWindow && mWindow.location.href.indexOf('localhost') < 0) { 
    //     mWindow.location = 'http://localhost:' + config.port;
    // }
}).on('error', function(e) {

    // Connect to database
    mongoose.connect(config.mongo.uri, config.mongo.options);

    // Populate DB with sample data
    if(config.seedDB) { require(path.resolve('server', 'config/seed')); }

    // Setup server
    var app = express();
    var server = http.createServer(app);

    require(path.resolve('server', 'config/express'))(app);

    //ctrl
    require(path.resolve('server', 'routes'))(app);

    // Start server
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
        // if (mWindow && mWindow.location.href.indexOf('localhost') < 0) { 
        //     mWindow.location = 'http://localhost:' + config.port;
        // }
    });
});
