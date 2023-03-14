import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

    //The initial state is an object with two properties: name and class.

    const s1 = {
        "name": "Soumajyoti",
        "class": "5b"
    }
    /*There is also a method named update() which uses the setTimeout() function to update the state
    after 1500 milliseconds.*/
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                name: "JSON",
                class: "Stringify"
            })
        }, 1500);
    }

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

/* Example Code Explanation for Understanding---> 

The value prop of the NoteContext.Provider component is set to an object that contains two 
properties: state and update. The state property holds the current state of the NoteState component,
which is an object with two properties: name and class. The update property holds a function that 
can be used to update the state of the NoteState component.

The props.children here is a special prop in React that allows us to wrap child components inside 
the NoteContext.Provider component. These child components will be able to access the state and 
update values provided by the NoteContext.Provider component through the useContext() hook.

So, in simple language, this block of code is creating a NoteContext.Provider component that 
provides the state and update values to its child components, which can access this data using the 
useContext() hook.
*/