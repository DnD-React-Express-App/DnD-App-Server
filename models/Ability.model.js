const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const characterSchema = new Schema({
    stats: {
        strength: { type: Number, required: true },
        dexterity: { type: Number, required: true },
        constitution: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        wisdom: { type: Number, required: true },
        charisma: { type: Number, required: true }
    },
});

module.exports = model('Character', characterSchema);
