const Item = require('../Item.model');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const armorSubtypes = {
  Light: ['Padded', 'Leather', 'Studded Leather'],
  Medium: ['Hide', 'Chain Shirt', 'Scale Mail'],
  Heavy: ['Ring Mail', 'Chain Mail', 'Splint', 'Plate'],
  Shield: ['Shield'],
};

const armorSchema = new Schema({
  name: { type: String, required: true },

  armorType: {
    type: String,
    enum: Object.keys(armorSubtypes),
    required: true,
  },

  subtype: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return armorSubtypes[this.armorType]?.includes(value);
      },
      message: (props) =>
        `${props.value} is not a valid subtype for armor type ${props.instance.armorType}`,
    },
  },

  ac: { type: Number, required: true },
  weight: { type: Number },
});

module.exports = Item.discriminator('Armor', armorSchema);