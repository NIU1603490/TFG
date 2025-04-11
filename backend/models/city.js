const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
}, { timestamps: true });

citySchema.index({ country: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('City', citySchema);