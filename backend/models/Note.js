const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // Title: is the task is done or pending
    title: {
        type: Boolean,
        default: false
    },
    // Description: Task saves here
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model("notes", NotesSchema);