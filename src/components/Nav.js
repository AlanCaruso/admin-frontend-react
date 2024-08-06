import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Admin</Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleNav}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNav}>About</Link>
          </li>
          <li>
            <Link to="/items" onClick={toggleNav}>Items</Link>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="nav-toggle" onClick={toggleNav}>
        &#9776;
      </div>
    </nav>
  );
};

export default Nav;
