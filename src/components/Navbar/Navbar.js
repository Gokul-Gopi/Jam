import React from 'react'
import '../Navbar/Navbar.css'
import { NavLink, Link } from 'react-router-dom'
import { BsPeopleFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { BsFillBellFill } from 'react-icons/bs'


const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to='/' className='link-to-home'>
                <h2>JAM!</h2>
            </Link>

            <div className='navigation-items'>
                <NavLink to='/' className='nav-link'>
                    <AiFillHome className='icon' />
                    <span>Feed</span>
                </NavLink>

                <NavLink to='/explore' className='nav-link'>
                    <BsPeopleFill className='icon' />
                    <span>Explore</span>
                </NavLink>

                <NavLink to='/nortification' className='nav-link'>
                    <BsFillBellFill className='icon' />
                    <span>Bulletin</span>
                </NavLink>

                <NavLink to='/profile' className='nav-link'>
                    <FaUserCircle className='icon' />
                    <span>Profile</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
