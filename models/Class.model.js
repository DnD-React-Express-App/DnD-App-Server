const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const classSchema = new Schema({
    classes: [{
        name: {
            type: String,
            enum: [
                'Barbarian',
                'Bard',
                'Cleric',
                'Druid',
                'Fighter',
                'Monk',
                'Paladin',
                'Ranger', 
                'Rogue', 
                'Sorcerer', 
                'Warlock', 
                'Wizard'],
            required: true
        },
        level: {
            type: Number,
            required: true,
            min: 1
        }
    }],
});

module.exports = model('Class', classSchema);
