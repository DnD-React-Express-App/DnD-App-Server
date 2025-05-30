const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    rarity: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'],
        default: 'Common'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
}, {
    discriminatorKey: 'type',
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema)