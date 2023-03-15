import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "640f5ece7a949be05dddb49d",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d5",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d6",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d7",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d8",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d9",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d00",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
        {
            "_id": "640f5ece7a949be05dddb49d12",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial)

    // Add a Note
    const addNote = (title, description, tag) => {
        // TODO Api Call
        console.log("Adding a new Note")
        const note = {
            "_id": "640f5ece7a949be05dddb4ejgnj9d12",
            "user": "640f5ea17a949be05dddb492",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = (id, title, description, tag) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState