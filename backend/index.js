const connectToMongo = require('./db'); // connectToMongo function is imported from db.js.
const express = require('express')

connectToMongo();
const app = express() //An instance of the express application is created and assigned to app variable.

const port = 5000 // The port number 3000 is assigned to port variable. Default it's 3000 but our react App also will run in 3000, So I changed it into 5000

/*
    When a client makes a request to the server, it sends data in the form of JSON format. The express.json() middleware parses the incoming JSON data and creates a JavaScript object from it. This makes it easier for the server to work with the incoming data.
*/
app.use(express.json()) // We use app.use to USE A MIDDLEWARE

/* 
    Available Routes are defined using app.use method. The first argument is the base route path, and the second argument is the middleware that handles the requests for that route.In this case, the middleware is imported from./ routes / auth and./ routes / notes for the / api / auth and / api / notes routes respectively.
*/

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// The app instance listens to requests on the specified port and logs a message to the console when the server is started.

app.listen(port, () => {
    console.log(`iNotebook Backend listening at http://localhost:${port}`)
})