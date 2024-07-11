const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    formid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('File', fileSchema);
