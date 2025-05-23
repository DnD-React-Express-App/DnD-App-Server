const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const speciesFeatureSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }
});

module.exports = model('SpeciesFeature', speciesFeatureSchema);