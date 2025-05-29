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
    Battleaxe: [{ type: 'Slashing', die: '1d8' }],
    Greatclub: [{ type: 'Bludgeoning', die: '1d8' }],
    Handaxe: [{ type: 'Slashing', die: '1d6' }],
};

const allWeaponTypes = Object.keys(baseDamageMap);

const rangeMap = {
    Melee: [
        'Greataxe', 'Greatsword', 'Dagger', 'Rapier', 'Scimitar', 'Longsword',
        'Shortsword', 'Mace', 'Warhammer', 'Staff', 'Spear', 'Club', 'Halberd',
        'LightHammer', 'Sickle', 'Battleaxe', 'Greatclub', 'Handaxe'
    ],
    Ranged: [
        'Bow', 'Crossbow'
    ],
};

const classMap = {
    Simple: [
        'Club', 'Dagger', 'LightHammer', 'Sickle', 'Spear', 'Staff', 'Mace',
        'Greatclub', 'Handaxe'
    ],
    Martial: [
        'Greataxe', 'Greatsword', 'Rapier', 'Scimitar', 'Longsword', 'Shortsword',
        'Warhammer', 'Bow', 'Crossbow', 'Halberd', 'Battleaxe'
    ],
};

const masteryMap = {
    Cleave: ['Greataxe', 'Halberd', 'Greatsword'],
    Nick: ['Dagger', 'LightHammer', 'Sickle', 'Scimitar'],
    Pierce: ['Rapier', 'Spear', 'Shortsword', 'Handaxe'],
    Smash: ['Warhammer', 'Mace', 'Club', 'Greatclub'],
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
    Battleaxe: ['Versatile'],
    Greatclub: ['Two-Handed'],
    Handaxe: ['Light', 'Thrown'],
};

const weaponSchema = new Schema({
    weaponType: {
        type: String,
        required: true,
        enum: allWeaponTypes,
    },
    weaponRangeCategory: {
        type: String,
        enum: ['Melee', 'Ranged'],
    },
    weaponClass: {
        type: String,
        enum: ['Simple', 'Martial'],
    },
    weaponBonus: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
    },
    damageTypes: [
        {
            type: {
                type: String,
                enum: [
                    'Slashing', 'Piercing', 'Bludgeoning', 'Fire', 'Cold', 'Acid',
                    'Necrotic', 'Radiant', 'Poison', 'Psychic', 'Thunder', 'Force', 'Lightning'
                ],
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
            'Light', 'Heavy', 'Reach', 'Two-Handed', 'Finesse', 'Thrown',
            'Ammunition', 'Versatile', 'Loading', 'Special'
        ]
    }],
    range: String,
    weight: Number,
});

weaponSchema.pre('save', function (next) {
    const type = this.weaponType;

    if (!this.weaponMastery) {
        for (const [mastery, weapons] of Object.entries(masteryMap)) {
            if (weapons.includes(type)) {
                this.weaponMastery = mastery;
                break;
            }
        }
    }

    if (!this.weaponRangeCategory) {
        for (const [rangeType, weapons] of Object.entries(rangeMap)) {
            if (weapons.includes(type)) {
                this.weaponRangeCategory = rangeType;
                break;
            }
        }
    }

    if (!this.weaponClass) {
        for (const [classType, weapons] of Object.entries(classMap)) {
            if (weapons.includes(type)) {
                this.weaponClass = classType;
                break;
            }
        }
    }

    if (!this.weaponProperties || this.weaponProperties.length === 0) {
        this.weaponProperties = propertyMap[type] || [];
    }

    if (!this.damageTypes || this.damageTypes.length === 0) {
        this.damageTypes = baseDamageMap[type] || [];
    }

    next();
});

module.exports = Item.discriminator('Weapon', weaponSchema);