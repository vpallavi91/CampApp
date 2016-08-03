'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    Room = require(path.resolve('server', 'api/room/room.model'));

var BlockSchema = new Schema({
  name: String,
  type: Boolean, // 0->man, 1->woman
  floors: { type: Number, min: 0}, //good for nothing
  rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}]
});


BlockSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Virtuals
 */
BlockSchema
    .virtual('count')
    .get( function () {
        return this.rooms.length;
    });

/**
 * hooks
 */
BlockSchema
    .post('remove', function(entity) {
        console.log('BlockSchema.postRemove');
        Room.find({ _id: { $in: entity.rooms } }, function (err, result) {
            result.forEach(function (item) {
                item.remove();
            });
        });
    });


module.exports = mongoose.model('Block', BlockSchema);