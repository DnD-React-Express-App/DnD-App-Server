const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const speciesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  creatureType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: [
      'Tiny',
      'Small',
      'Medium',
      'Large',
    ],
    required: true,
  },
  speed: {
      type: Number,
      required: true,
    },
  abilities: [{ type: Types.ObjectId, ref: 'SpeciesFeature' }]
});

module.exports = model('Species', speciesSchema);