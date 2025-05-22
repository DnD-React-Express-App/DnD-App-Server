const mongoose = require('mongoose');
const { Schema } = mongoose;

const spellSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: String,
  castingTime: String,
  range: String,
  components: [String],
  duration: String,
  description: String,
});

module.exports = mongoose.model('Spell', spellSchema);
