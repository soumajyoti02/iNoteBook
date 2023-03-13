// The db.js file defines a function connectToMongo that connects to a MongoDB database using the mongoose package.The mongoose.connect() method is used to establish a connection with the specified MongoDB URI.If the connection is successful, a message is logged to the console.If there is an error, an error message is logged to the console.


const mongoose = require('mongoose');

// const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true"
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo", error);
    }
};

module.exports = connectToMongo;