/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var path = require('path');
var Allocation = require(path.resolve('server', 'api/allocation/allocation.model'));
var Block = require(path.resolve('server', 'api/block/block.model'));
var Category = require(path.resolve('server', 'api/category/category.model'));
var Config = require(path.resolve('server', 'api/config/config.model'));
var Person = require(path.resolve('server', 'api/person/person.model'));
var Product = require(path.resolve('server', 'api/product/product.model'));
var Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));
var Room = require(path.resolve('server', 'api/room/room.model'));
var User = require(path.resolve('server', 'api/user/user.model'));


var mongoose = require('mongoose'); 
mongoose.Model.seed = function(entities) {  
    var promise = new mongoose.Promise();
    this.create(entities, function(err) {
        if(err) { promise.reject(err); }
        else    { promise.resolve(); }
    });
    return promise;
};
// Reset collections
User.remove().exec()
.then(function() { 
    return Reservation.remove().exec() 
})
.then(function() { 
    return Allocation.remove().exec() 
})
.then(function() { 
    return Person.remove().exec() 
})
.then(function() { 
    return Room.remove().exec() 
})
.then(function() { 
    return Block.remove().exec() 
})
.then(function() { 
    return Product.remove().exec() 
})
.then(function() { 
    return Category.remove().exec() 
})
.then(function() { 
    return Config.remove().exec() 
})

// Seed
.then(function() { 
    return User.seed(require(path.resolve('server', 'config/seed/users.json')));
})
.then(function() { 
    return Config.seed(require(path.resolve('server', 'config/seed/config.json')));
})
.then(function() { 
    return Category.seed(require(path.resolve('server', 'config/seed/categories.json')));
})
.then(function() { 
    return Product.seed(require(path.resolve('server', 'config/seed/products.json')));
})
.then(function() { 
    return Block.seed(require(path.resolve('server', 'config/seed/blocks.json')));
})
.then(function() { 
    return Room.seed(require(path.resolve('server', 'config/seed/rooms.json')));
})
.then(function() { 
    return Person.seed(require(path.resolve('server', 'config/seed/persons.json')));
})
.then(function() { 
    return Allocation.seed(require(path.resolve('server', 'config/seed/allocations.json')));
})
.then(function() { 
    return Reservation.seed(require(path.resolve('server', 'config/seed/reservations.json')));
})

// Done!
.then(function() { 
    console.log("Done seeding!")
}, function(err) { 
    throw err;
});