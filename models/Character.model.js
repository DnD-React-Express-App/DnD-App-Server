const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  classes: [{
    name: {
      type: String,
      enum: [
        'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk',
        'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
      ],
      required: true
    },
    level: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  subclass: {
    type: String,
  },
  race: {
    type: String,
    enum: [
      'Human', 'Elf', 'Half-Elf', 'Dwarf', 'Halfling', 'Gnome',
      'Half-Orc', 'Dragonborn', 'Tiefling', 'Aasimar', 'Genasi',
      'Goliath', 'Tabaxi', 'Triton', 'Firbolg', 'Kenku', 'Lizardfolk',
      'Goblin', 'Orc', 'Bugbear'
    ],
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  stats: {
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    wisdom: { type: Number, required: true },
    charisma: { type: Number, required: true }
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  proficiencies: {
    skills: [String],
    armor: [String],
    weapons: [String],
    tools: [String]
  },
  spells: [{
    name: String,
    class: String
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  background: {
    type: String,
    required: true
  },
  backstory: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Character', characterSchema);