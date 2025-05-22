const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const characterSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
});

module.exports = model('Character', characterSchema);
