const  {Schema, model, Types} = require('mongoose');

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Notes', notesSchema);
