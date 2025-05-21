const Item = require('../Item.model');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const weaponSchema = new Schema({
  weaponName: { type: String, required: true },
  weaponType: {
    type: String,
    required: true,
    enum: [
      'Greataxe', 'Dagger', 'Rapier', 'Scimitar', 'Longsword',
      'Shortsword', 'Mace', 'Greatsword', 'Warhammer', 'Bow',
      'Crossbow', 'Staff', 'Spear', 'Club', 'Halberd', 'Light Hammer', 'Sickle', 'Other'
    ]
  },
  weaponAttribute: {
    type: String,
    enum: ['Melee', 'Ranged', 'Thrown', 'Magic'],
    required: true
  },
  weaponBonus: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: false
  },
  damageTypes: [
    {
      type: {
        type: String,
        enum: [
          'Slashing', 'Piercing', 'Bludgeoning', 'Fire', 'Cold',
          'Acid', 'Necrotic', 'Radiant', 'Poison', 'Psychic',
          'Thunder', 'Force', 'Lightning'
        ],
        required: true
      },
      die: {
        type: String,
        required: true,
        match: /^\d+d\d+$/ // e.g., 1d6
      }
    }
  ],
  weaponMastery: {
    type: String,
    enum: ['Cleave', 'Nick', 'Vex', 'Push', 'Slow', 'Flex', 'None'],
    default: 'None'
  },
  range: String,
  weight: Number
});

// Weapon Mastery Mapping
const masteryMap = {
  Cleave: ['Greataxe', 'Halberd'],
  Nick: ['Dagger', 'Light Hammer', 'Sickle', 'Scimitar'],
  Vex: ['Rapier', 'Shortsword'],
  Push: ['Warhammer', 'Mace'],
  Slow: ['Greatsword'],
  Flex: ['Longsword', 'Spear']
};

// Auto-assign weaponMastery based on weaponType
weaponSchema.pre('save', function (next) {
  for (const [mastery, weapons] of Object.entries(masteryMap)) {
    if (weapons.includes(this.weaponType)) {
      this.weaponMastery = mastery;
      return next();
    }
  }
  this.weaponMastery = 'None';
  next();
});

module.exports = Item.discriminator('Weapon', weaponSchema);