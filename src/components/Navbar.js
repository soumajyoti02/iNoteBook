import React, { useEffect } from 'react'
import { NavLink, useLocation } from "react-router-dom"

const Navbar = () => {
    let location = useLocation() //It returns an object that contains information about the current URL.
    /*
    useEffect() hook is used to add side effects to a functional component and allows you to execute code that needs to run after the component has rendered. It takes a function as an argument and an array of dependencies to determine when the effect should run.
    */
    useEffect(() => {
        console.log(location.pathname)
    }, [location])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    {/* A <NavLink> is a special kind of <Link> that knows whether or not it is "active" or "pending". */}

                    <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={`nav-link`} aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link`} to="/about">About</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
