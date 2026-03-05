import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollTo('hero')}>
          Portfolio
        </div>
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item" onClick={() => scrollTo('about')}>About</li>
          <li className="nav-item" onClick={() => scrollTo('skills')}>Skills</li>
          <li className="nav-item" onClick={() => scrollTo('projects')}>Projects</li>
          <li className="nav-item" onClick={() => scrollTo('experience')}>Experience</li>
          <li className="nav-item" onClick={() => scrollTo('education')}>Education</li>
          <li className="nav-item" onClick={() => scrollTo('achievements')}>Achievements</li>
          <li className="nav-item" onClick={() => scrollTo('contact')}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
