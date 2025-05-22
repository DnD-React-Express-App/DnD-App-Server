const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const backgroundSchema = new Schema({
    backstory: {
        type: String
    },
});

module.exports = model('Background', backgroundSchema);
