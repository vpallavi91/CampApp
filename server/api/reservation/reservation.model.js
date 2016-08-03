'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    path = require('path'),
    Room = undefined;

var ReservationSchema = new Schema({
	datePayement: { type: Date, default: Date.now },
	dateFrom: { type: Date, default: Date.now },
	dateTo: Date,
	status: { type: Boolean, default: true },
	price: Number,
	person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person', childPath:"reservations"},
	room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', childPath:"reservations"}
});

ReservationSchema.plugin(relationship, { relationshipPathName: ['person', 'room'] });

/**
 * hooks
 */
ReservationSchema
  .post('save', function(entity) {
    getRoomModel().update({_id: entity.room}, { $inc: { free: -1 } }).exec();
  })
  .post('remove', function(entity) {
    console.log('ReservationSchema.postRemove');
    if(entity.status){ 
      getRoomModel().update({_id: entity.room}, { $inc: { free: 1 } }).exec();
    }
  });

function getRoomModel() {
  if(!Room) {
    Room = require(path.resolve('server', 'api/room/room.model'));
  }
  return Room;
}

module.exports = mongoose.model('Reservation', ReservationSchema);