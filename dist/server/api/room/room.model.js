'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship'),
    path = require('path'),
    Reservation = require(path.resolve('server', 'api/reservation/reservation.model'));

var RoomSchema = new Schema({
  name: String,
  floor: { type: Number, min: 0},
  capacity: { type: Number, min: 0},
  free: { type: Number, min: 0},
  block: {type: mongoose.Schema.Types.ObjectId, ref: 'Block', childPath: 'rooms'},
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}]
});

RoomSchema.plugin(relationship, { relationshipPathName: 'block' });

RoomSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Virtuals
 */
RoomSchema
	.virtual('isFree')
	.get( function () {
		return (this.free > 0);
	});


/**
 * hooks
 */
RoomSchema
    .post('remove', function(entity) {
        console.log('RoomSchema.postRemove');
        Reservation.find({ _id: { $in: entity.reservations } }, function (err, result) {
            result.forEach(function (item) {
                item.remove();
            });
        });
    });

module.exports = mongoose.model('Room', RoomSchema);