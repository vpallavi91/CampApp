/**
 * Main application routes
 */

'use strict';

var path = require('path');
var errors = require(path.resolve('server', 'components/errors'));

module.exports = function(app) {

  // Insert routes below
  app.use('/api/reclamations', require(path.resolve('server', 'api/reclamation')));
  app.use('/api/config', require(path.resolve('server', 'api/config')));
  app.use('/api/allocations', require(path.resolve('server', 'api/allocation')));
  app.use('/api/categories', require(path.resolve('server', 'api/category')));
  app.use('/api/products', require(path.resolve('server', 'api/product')));
  app.use('/api/reservations', require(path.resolve('server', 'api/reservation')));
  app.use('/api/rooms', require(path.resolve('server', 'api/room')));
  app.use('/api/blocks', require(path.resolve('server', 'api/block')));
  app.use('/api/persons', require(path.resolve('server', 'api/person')));
  app.use('/api/users', require(path.resolve('server', 'api/user')));
  app.use('/auth', require(path.resolve('server', 'auth')));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
