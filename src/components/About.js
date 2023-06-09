/*
The About.js file imports useContext() method from React and the noteContext object created in the
noteContext.js file. 
*/
import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    /*The useContext() hook allows the component to consume the context created in 
    noteContext.js file.*/

    const a = useContext(noteContext)

    return (
        <div>
            This is About page
        </div>
    )
}

export default About


