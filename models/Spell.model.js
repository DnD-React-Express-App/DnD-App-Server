const mongoose = require('mongoose');
const { Schema } = mongoose;

const spellSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: {
    type: String,
    enum: [
      'Abjuration', 'Conjuration', 'Divination',
      'Enchantment', 'Evocation', 'Illusion',
      'Necromancy', 'Transmutation'
    ],
  },
  castingTime: String,
  range: String,
  components: {
    type: [String],
    enum: ['V', 'S', 'M'],
  },
  duration: {
    type: String,
    enum: [
      'Instantaneous',
      'Concentration, up to 1 minute',
      'Concentration, up to 10 minutes',
      '1 round',
      '1 minute',
      '10 minutes',
      '1 hour',
      '8 hours',
      '24 hours',
      'Until dispelled'
    ],
  },
  description: String,
  concentration: { type: Boolean, default: false },
  ritual: { type: Boolean, default: false },
  classes: [String],
  attackSave: {
    type: String,
    enum: [
      '',
      'Melee', 'Ranged', 'Spell Attack',
      'STR Save', 'DEX Save', 'CON Save',
      'INT Save', 'WIS Save', 'CHA Save'
    ]
  },
  damageEffect: {
    type: String,
    enum: [
      '',
      'Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force',
      'Lightning', 'Necrotic', 'Piercing', 'Poison',
      'Psychic', 'Radiant', 'Slashing', 'Thunder',
      'Control', 'Buff', 'Debuff', 'Utility'
    ]
  },

  dieAmount: {
    type: Number,
    min: 0,
    default: 0,
  },
  damageDie: {
    type: String,
    enum: ['', 'd4', 'd6', 'd8', 'd10', 'd12'],
    default: '',
  },
});

module.exports = mongoose.model('Spell', spellSchema);
