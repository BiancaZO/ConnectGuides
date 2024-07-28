const mongoose = require('mongoose');

const guideServiceSchema = new mongoose.Schema({
  // owner references to the User collection
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  name: String,
  city: String,
  photos: [String],
  description: String,
  extraInfo: String,
  phone: Number,
  email: String,
  price: Number,
  // services: String,
  services: [String], // (Rafael) Acho q o services precisa ser uma lista de strings
  maxTravelers: Number,
  price: Number
  // checkIn: Number,
  // checkOut: Number
});

const GuideServiceModel = mongoose.model('GuideService', guideServiceSchema);

module.exports = GuideServiceModel;


// (Rafael) Other possible attributes: 
// checkIn: Number,
// checkOut: Number,
// maxGuests: Number,