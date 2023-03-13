/*      
In notes.js inside the routes folder, router.get('/', ...) specifies that this route will be triggered when the user navigates to the root path of the notes route.The root path is denoted by '/'.

In Express.js, req stands for request and res stands for response.req contains information about the incoming HTTP request, while res is an object that contains the response that will be sent back to the client.

res.json(obj) sends a JSON response to the client.Here, obj is the object that is being sent as a response.

module.exports is used to export the code from one module so that it can be used in another module.In this case, the connectToMongo function is being exported from db.js so that it can be used in index.js.Similarly, the router object is being exported from auth.js and notes.js so that they can be used in index.js.

The req.user.id property is used to identify the user who is making the request. This property is set in a middleware function called fetchuser, which is passed as a second parameter in the router.post() method.

The fetchuser middleware function is called before the main route handler, and it adds a user property to the req object if the user is authenticated and authorized to access the requested route.

In summary, module.exports is a way of making code in one module available for use in another module.
*/
const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "asdfghjkl"

/* BASIC STRUCTURE OF ROUTER.GET FOR UNDERSTANDING
router.get('/', (req, res) => {
    obj = {
        name: 'Soumajyoti Sarkar',
        mode: 'Cash',
    }
    res.json(obj)
})  */

// Create a User using: POST "/api/auth/createuser". No Login Required

// <<---------------- ROUTE 1 ---------------->>

router.post('/createuser', [
    // Basic Checks that User Entered the Data Corrwctly

    body('email', 'Enter a Valid Email').isEmail(),
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('password', 'Password Must be Atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {

    // This line uses the validationResult function from the express-validator library to get an array of validation errors for the request.

    const errors = validationResult(req);

    // This line checks if the array of validation errors is not empty.If there are validation errors, it will return a 400 HTTP response with an array of error messages.

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    /* The User.findOne() method is a Mongoose method that returns a promise that resolves to the first document that matches the query criteria.In this case, it looks for a document in the User collection whose email field matches req.body.email.If a document is found, it is assigned to the user variable.If not, user is assigned null.

    The following if statement checks if user is truthy, meaning it is not null. If user is truthy, that means a document with the email already exists in the database.In that case, the server responds with an error message by calling the res.status().json() method.The res object is the response object that was passed to the route handler as a parameter.
    */

    try {
        let user = await User.findOne({ email: req.body.email }) // Returns a Promise 
        if (user) {
            return res.status(400).json({ error: 'Sorry, this Email Already Exists' })
        }

        /*  The code generates a new salt using the `bcrypt.genSalt()` method and uses it to hash the user's password using the `bcrypt.hash()` method.Both returns Promise so We have to await them inside our async function. 
        Then it creates a new user document in the database using the `User.create()` method, which returns a Promise that resolves to the newly created user document.
        */

        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // Creating a New User Document
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })

        /* 
            First, an object named data is created with a property called user. This user property has an id key that is set to the id of the newly created user. the server is creating a JSON object called data that contains the id of the newly created user. 
            This data object is then passed as the first argument to the jwt.sign function along with a secret key (JWT_SECRET) to generate an authentication token.
        */
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        // res.json(user)
        res.json({ authToken })
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }

    /* This Part is Commented because we are using async function. So after await, user will get the value   
     .then(user => res.json(user)) //Waits for the user object to be created in the database, and then sends a JSON response back to the client with the newly created user object.

            .catch(err => {
            console.log(err)
            res.json({ error: 'Please Enter Unique Value', message: err.message })
        })

    */
    // res.send(req.body)  [This is Used at the time of Basics ]

})


// <<---------------- ROUTE 2 ---------------->>


// Authenticate a User using: POST "/api/auth/login". No Login Required. Sets up the login endpoint and specifies that it will handle POST requests to the login route.

router.post('/login', [

    // It checks that the email is in a valid format using the isEmail() function. If the email is not in a valid format, it will return an error message Enter a Valid Email. It also checks that the password is not empty using the notEmpty() function.

    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Cannot be Blank').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { email, password } = req.body //This line extracts the email and password from the request body
    try {
        let user = await User.findOne({ email })

        // This line tries to find a user with the given email in the database using the findOne() method of the User model.If there is no user with that email, it will return a 400 status code with a JSON response Please Try to Login With Correct Credentials.

        if (!user) {
            return res.status(400).json({ error: `Please Try to Login With Correct Credentials` })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: `Please Try to Login With Correct Credentials` })
        }

        // This line creates an object with the user's id as a property, which will be used to create a JSON web token.
        const data = {
            user: {
                id: user.id
            }
        }

        // This line creates a JSON web token using the sign() method of the jsonwebtoken library.It takes the user id data and a secret key to sign the token.

        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken }) //  sends a JSON response to the client containing the auth token, which the client can use to authenticate future requests to protected routes.
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


// <<---------------- ROUTE 3 ---------------->>

// Get Logged in User Details using: POST "/api/auth/getuser". Login Required

// This line sets up the route for the /getuser endpoint and specifies that it will handle POST requests. It also includes middleware function fetchuser which will be executed before the main handler. The handler function will be executed when a POST request is sent to this endpoint.

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //This line gets the user ID from the authenticated user's request object. The fetchuser middleware has already authenticated the user, so we can get the user ID from the request object.

        userId = req.user.id

        //This line finds the user in the database using the user ID and selects all fields except the password field. It uses the findById() method of the User model in the Mongoose library to find the user in the database.

        const user = await User.findById(userId).select("-password")

        res.send(user) //This line sends the user object as a response to the client
    } catch (error) { // Used to handle any errors that occur during the execution of the route handler.
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

// This line exports the router object so that it can be used by other parts of the application.
module.exports = router