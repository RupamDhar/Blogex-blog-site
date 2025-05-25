import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar-section'>
            <span id='title'>Blogex.</span>
            <button
                id="create-btn"
                onClick={() => window.open('/create-blog', '_blank')}
            >
                + CREATE
            </button>
        </div>
    )
}

export default Navbar
