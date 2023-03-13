// In this code, NotesSchema is defining the structure of a document that will be stored in a MongoDB collection called "notes".It has four fields: "title", "description", "tag", and "date".Each field has a specific data type, and some fields have additional rules like being required or having a default value.

// So essentially, this code is defining the structure of a "notes" document in the database and creating a model that can be used to interact with it.

const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
})



// The mongoose.model function takes two arguments: the name of the collection(in this case, "notes"), and the schema that will define the structure of the documents in that collection.This creates a model that can be used to interact with the "notes" collection in the database.

module.exports = mongoose.model('notes', NotesSchema);