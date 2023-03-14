/*
The noteContext.js file exports a React context created using createContext() method from React. 
This context can be used to pass data down the component tree without passing props manually at 
every level. This is useful when we want to share data between components that are not directly 
related to each other.
*/

import { createContext } from "react";

const noteContext = createContext()

export default noteContext