const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  bikeName: { type: String, required: true },
  bikeModel: { type: Number, required: true },
  bikeNumber: { type: String, required: true },
  State: { type: String, required: true },
  City: { type: String, required: true },
  Area: { type: String, required: true },
  pricePerHour: { type: Number, required: true, min: 0 },
  pinCode: { type: String, required: true },
  listingTime: { type: Date, default: Date.now },
  expirationTime: { type: Date, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
});

module.exports = mongoose.model('Bike', bikeSchema);
