const mongoose = require('mongoose');

const guideServiceSchema = new mongoose.Schema({
  // owner references to the User collection
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  ownerName: String,
  title: String,
  name: String,
  city: String,
  photos: [String],
  description: String,
  extraInfo: String,
  phone: Number,
  email: String,
  price: Number,
  services: [String],
  maxTravelers: Number,
  price: Number
});

const GuideServiceModel = mongoose.model('GuideService', guideServiceSchema);

module.exports = GuideServiceModel;