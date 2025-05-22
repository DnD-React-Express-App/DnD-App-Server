const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const speciesSchema = new Schema({
    race: {
        type: String,
        enum: [
          'Human',
          'Elf',
          'Half-Elf',
          'Dwarf',
          'Halfling',
          'Gnome',
          'Half-Orc',
          'Dragonborn',
          'Tiefling',
          'Aasimar',
          'Genasi',
          'Goliath',
          'Tabaxi',
          'Triton',
          'Firbolg',
          'Kenku',
          'Lizardfolk',
          'Goblin',
          'Orc',
          'Bugbear'
        ],
        required: true
      },
});

module.exports = model('Species', spiecesSchema);
