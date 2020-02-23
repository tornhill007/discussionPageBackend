const mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema({
    parentId: {
        type: String,
        default: null
    },
    state: {
        type: Boolean,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    creationTime: {
        type: String,
        required: true
    }
});

mongoose.model('Comments', commentsSchema);