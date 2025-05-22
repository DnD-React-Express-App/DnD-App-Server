const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const equipmentSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

module.exports = model('Equipment', equipmentSchema);
