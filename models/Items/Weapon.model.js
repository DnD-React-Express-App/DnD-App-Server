const Item = require('../Item');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const weaponSchema = new Schema({
    damage: { type: String,
        enum: ['Slashing', 'Piercing', 'Bludgeoning'],
        required: true},
    range: String,
    weaponType: { type: String, enum: ['Melee', 'Ranged', 'Thrown', 'Magic'] }
});

module.exports = Item.discriminator('Weapon', weaponSchema);