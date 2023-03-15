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
            "_id": "640f5ece7a949be05dddb49d",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
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
            "_id": "640f5ece7a949be05dddb49d",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
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
            "_id": "640f5ece7a949be05dddb49d",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
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
            "_id": "640f5ece7a949be05dddb49d",
            "user": "640f5ea17a949be05dddb492",
            "title": "Inspired",
            "description": "Concentrte",
            "tag": "personal",
            "date": "2023-03-13T17:35:10.449Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState