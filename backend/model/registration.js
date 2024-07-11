const mongoose = require('mongoose');

const Registration = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Registration', Registration);
