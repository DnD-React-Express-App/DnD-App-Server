const Item = require('../Item.model');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const baseDamageMap = {
  Greataxe: [{ type: 'Slashing', die: '1d12' }],
  Greatsword: [{ type: 'Slashing', die: '2d6' }],
  Dagger: [{ type: 'Piercing', die: '1d4' }],
  Rapier: [{ type: 'Piercing', die: '1d8' }],
  Scimitar: [{ type: 'Slashing', die: '1d6' }],
  Longsword: [{ type: 'Slashing', die: '1d8' }],
  Shortsword: [{ type: 'Piercing', die: '1d6' }],
  Mace: [{ type: 'Bludgeoning', die: '1d6' }],
  Warhammer: [{ type: 'Bludgeoning', die: '1d8' }],
  Bow: [{ type: 'Piercing', die: '1d8' }],
  Crossbow: [{ type: 'Piercing', die: '1d8' }],
  Staff: [{ type: 'Bludgeoning', die: '1d6' }],
  Spear: [{ type: 'Piercing', die: '1d6' }],
  Club: [{ type: 'Bludgeoning', die: '1d4' }],
  Halberd: [{ type: 'Slashing', die: '1d10' }],
  LightHammer: [{ type: 'Bludgeoning', die: '1d4' }],
  Sickle: [{ type: 'Slashing', die: '1d4' }],
};

const masteryMap = {
    Cleave: ['Greataxe', 'Halberd', 'Greatsword'],
    Nick: ['Dagger', 'LightHammer', 'Sickle', 'Scimitar'],
    Pierce: ['Rapier', 'Spear', 'Shortsword'],
    Smash: ['Warhammer', 'Mace', 'Club'],
    Precision: ['Longsword', 'Crossbow', 'Bow'],
};

const propertyMap = {
    Greataxe: ['Heavy', 'Two-Handed'],
    Dagger: ['Light', 'Finesse', 'Thrown'],
    Rapier: ['Finesse'],
    Scimitar: ['Finesse', 'Light'],
    Longsword: ['Versatile'],
    Shortsword: ['Finesse', 'Light'],
    Mace: [],
    Greatsword: ['Heavy', 'Two-Handed'],
    Warhammer: ['Versatile'],
    Bow: ['Ammunition', 'Two-Handed'],
    Crossbow: ['Ammunition', 'Loading', 'Two-Handed'],
    Staff: ['Versatile'],
    Spear: ['Thrown', 'Versatile'],
    Club: ['Light'],
    Halberd: ['Heavy', 'Two-Handed', 'Reach'],
    LightHammer: ['Light', 'Thrown'],
    Sickle: ['Light'],
};

const weaponSchema = new Schema({
    weaponName: {
        type: String,
        required: true,
    },
    weaponType: {
        type: String,
        required: true,
        enum: Object.keys(propertyMap),
    },
    weaponAttribute: {
        type: String,
        enum: ['Melee', 'Ranged', 'Thrown', 'Magic'],
        required: true
    },
    weaponBonus: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    damageTypes: [
        {
            type: {
                type: String,
                enum: ['Slashing', 'Piercing', 'Bludgeoning', 'Fire', 'Cold', 'Acid', 'Necrotic', 'Radiant', 'Poison', 'Psychic', 'Thunder', 'Force', 'Lightning'],
                required: true
            },
            die: {
                type: String,
                required: true,
                match: /^\d+d\d+$/,
            }
        }
    ],
    weaponMastery: {
        type: String,
        enum: Object.keys(masteryMap),
    },
    weaponProperties: [{
        type: String,
        enum: [
            'Light',
            'Heavy',
            'Reach',
            'Two-Handed',
            'Finesse',
            'Thrown',
            'Ammunition',
            'Versatile',
            'Loading',
            'Special'
        ]
    }],
    range: String,
    weight: Number,
});

weaponSchema.pre('save', function (next) {
    if (!this.weaponMastery) {
        for (const [mastery, weapons] of Object.entries(masteryMap)) {
            if (weapons.includes(this.weaponType)) {
                this.weaponMastery = mastery;
                break;
            }
        }
    }

    if (!this.weaponProperties || this.weaponProperties.length === 0) {
        this.weaponProperties = propertyMap[this.weaponType] || [];
    }

    if (!this.damageTypes || this.damageTypes.length === 0) {
    this.damageTypes = baseDamageMap[this.weaponType] || [];
  }

    next();
});

module.exports = Item.discriminator('Weapon', weaponSchema);
