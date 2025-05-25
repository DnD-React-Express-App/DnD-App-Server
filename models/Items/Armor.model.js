const Item = require('../Item.model');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryMap = {
  Padded: 'Light',
  Leather: 'Light',
  StuddedLeather: 'Light',
  Hide: 'Medium',
  ChainShirt: 'Medium',
  ScaleMail: 'Medium',
  Breastplate: 'Medium',
  HalfPlate: 'Medium',
  RingMail: 'Heavy',
  ChainMail: 'Heavy',
  Splint: 'Heavy',
  Plate: 'Heavy',
  Shield: 'Shield',
};

const propertyMap = {
  Padded: ['Stealth Disadvantage'],
  Leather: [],
  StuddedLeather: [],
  Hide: [],
  ChainShirt: [],
  ScaleMail: ['Stealth Disadvantage'],
  Breastplate: [],
  HalfPlate: ['Stealth Disadvantage'],
  RingMail: ['Stealth Disadvantage'],
  ChainMail: ['Stealth Disadvantage'],
  Splint: ['Stealth Disadvantage'],
  Plate: ['Stealth Disadvantage'],
  Shield: ['Can be wielded with another item'],
};

const standardArmorValues = {
  Padded: { base: 11, dex: true, cap: null },
  Leather: { base: 11, dex: true, cap: null },
  StuddedLeather: { base: 12, dex: true, cap: null },
  Hide: { base: 12, dex: true, cap: 2 },
  ChainShirt: { base: 13, dex: true, cap: 2 },
  ScaleMail: { base: 14, dex: true, cap: 2 },
  Breastplate: { base: 14, dex: true, cap: 2 },
  HalfPlate: { base: 15, dex: true, cap: 2 },
  RingMail: { base: 14, dex: false, cap: null },
  ChainMail: { base: 16, dex: false, cap: null },
  Splint: { base: 17, dex: false, cap: null },
  Plate: { base: 18, dex: false, cap: null },
  Shield: { base: 2, dex: false, cap: null },
};

const armorSchema = new Schema({
  name: { type: String, required: true },
  armorType: {
    type: String,
    required: true,
    enum: Object.keys(categoryMap)
  },
  armorClassBase: { type: Number },
  usesDexModifier: { type: Boolean },
  dexModifierCap: { type: Number },
  armorClassBonus: { type: Number, default: 0 },
  requiresProficiency: { type: Boolean, default: true },
  stealthDisadvantage: { type: Boolean, default: false },
  armorProperties: [{
    type: String,
    enum: [
      'Stealth Disadvantage',
      'Requires Proficiency',
      'Magical',
      'Can be wielded with another item',
      'Custom Fit',
      'Enchanted'
    ]
  }],
  weight: Number,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

armorSchema.virtual('armorCategory').get(function () {
  return categoryMap[this.armorType];
});

armorSchema.pre('save', function (next) {
  const std = standardArmorValues[this.armorType];

  if (std) {
    this.armorClassBase = std.base;
    this.usesDexModifier = std.dex;
    this.dexModifierCap = std.cap;
  }

  if (!this.armorProperties || this.armorProperties.length === 0) {
    this.armorProperties = propertyMap[this.armorType] || [];
  }

  this.stealthDisadvantage = this.armorProperties.includes('Stealth Disadvantage');
  next();
});

module.exports = Item.discriminator('Armor', armorSchema);
