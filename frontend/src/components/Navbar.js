import React from 'react'
import './style1.css'
import { Link, NavLink } from 'react-router-dom'
import image from './images/esdlogo.png'


const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Navbar brand */}<a href='https://www.linkedin.com/in/blue-book-foundation-826b97249/?originalSubdomain=in'>
            <img src={image} title="ESD link"
              height={60}
              alt="ESD Logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
            </a>
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse mx-5" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-5">
              <li className="nav-item">
                <NavLink className="nav-link hover" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hover" to="/createstudent">
                  Create Student
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link hover" href="#" to='/courses'>
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link hover" href="#" to='/students'>
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hover" to="/UserDetail">
                  User
                </NavLink>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">

              <NavLink className="nav-link  mx-3" to="/login">
                <button type="button" className="btn btn-primary" title='close id'>
                  Log out
                </button>
              </NavLink>
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>


    </div>

  )
}

export default Navbar
