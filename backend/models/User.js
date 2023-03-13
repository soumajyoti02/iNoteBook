/*
    User.js is a model file that defines the schema for the user collection in the MongoDB database. It defines the fields and their data types for a user object such as name, email, password, and date.

    This file exports a Mongoose model for the user collection using the mongoose.model() method. This model can be used to perform CRUD (create, read, update, and delete) operations on the user collection in the database.
*/


const mongoose = require('mongoose')
const { Schema } = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

// The mongoose.model function takes two arguments: the name of the collection(in this case, "notes"), and the schema that will define the structure of the documents in that collection.This creates a model that can be used to interact with the "notes" collection in the database.

const User = mongoose.model('user', UserSchema)
module.exports = User