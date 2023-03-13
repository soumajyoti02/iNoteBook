/* In Express.js, req stands for request and res stands for response.req contains information about the incoming HTTP request, while res is an object that contains the response that will be sent back to the client.
res.json(obj) sends a JSON response to the client.Here, obj is the object that is being sent as a response.

The req.user.id property is used to identify the user who is making the request. This property is set in a middleware function called fetchuser, which is passed as a second parameter in the router.post() method.

The fetchuser middleware function is called before the main route handler, and it adds a user property to the req object if the user is authenticated and authorized to access the requested route.
*/


const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

// <<---------------- ROUTE 1 ---------------->>

// Get All The Notes using: GET "/api/notes/fetchallnotes". Login Required

// It will first call a function called "fetchuser", which will verify that the user is authenticated and authorized to access this route.

router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        /*
        The code is using the Note model to find all the notes that are associated with the user ID stored in the req.user.id property. The Note object refers to a Mongoose model that defines the structure of the data stored in the database for notes. 

        The find() method is called on the Note model to search for all notes that match a specific criteria, which is specified as an object with a property user and its value set to req.user.id. 

        These notes are then stored in a notes variable, and then sent back to the client in a JSON response using the res.json() method.
        */

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

// <<---------------- ROUTE 2 ---------------->>

// Add a new Note using: POST "/api/notes/addnote". Login Required

router.post('/addnote', fetchuser, [

    // The server checks the note data to make sure that the title field has at least 3 characters and the description field has at least 5 characters.

    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Description atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body // extract the title, description, and tag properties from the req.body object. This is used in new Note method below

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        //If the data is valid, the server creates a new note object using the title, description, and tag fields from the request, and sets the user field to the ID of the currently logged-in user.

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // The server then saves the new note to the database and sends a response back to the user with the saved note data.
        const savedNote = await note.save()

        res.json(savedNote)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

// <<---------------- ROUTE 3 ---------------->>

// Update an Existing Note using: PUT "/api/notes/updatenote". Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body // Extract the title, description, and tag properties from the req.body object.

    //After retrieving the updated data, the server creates a new empty object called newNote. The newNote object will be used to store the updated values of the note.

    try {
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the Note to be Updated and Update it
        // First, it finds the note with the given ID using Note.findById().
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        //This line checks whether the user is authorized to make changes to the note. It compares the user field of the note object (which is the ID of the user who created the note) to the id field of the req.user object (which was set by the fetchuser middleware).

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        /*
        This line updates the note in the database using Note.findByIdAndUpdate() method. It uses the ID parameter from the request URL to identify the note to be updated. 

        The { $set: newNote } object specifies which fields to update and their new values. The $set operator tells MongoDB to update only the specified fields. 

        The { new: true } option tells the method to return the updated note instead of the old one. The updated note is stored in the note variable.
        */

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})


// <<---------------- ROUTE 4 ---------------->>

// Delete an Existing Note using: DELETE "/api/notes/deletenode". Login Required

router.delete('/deletenode/:id', fetchuser, async (req, res) => {
    try {
        //Find the Note to be Delete and Delete it
        // First, it finds the note with the given ID using Note.findById().
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        /* Allow Deletion only if user owns this Note
        
        It compares the user field of the note object (which is the ID of the user who created the note) to the id field of the req.user object (which was set by the fetchuser middleware). 

        The toString() method is used to convert the user property of the note object, which is a mongoose.Types.ObjectId data type, to a string so that it can be compared with the req.user.id, which is also a string.
        */
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been Deleted", note: note })
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router