const mongoose = require('mongoose');

const guideServiceSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  name: String,
  city: String,
  photos: [String],
  description: String,
  //extraInfo: String,
  phone: Number,
  email: String,
  price: Number,
});

const GuideServiceModel = mongoose.model('GuideService', guideServiceSchema);

module.exports = GuideServiceModel;