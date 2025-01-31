import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ onLogout, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Admin</Link>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/categories" onClick={toggleNav}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/items" onClick={toggleNav}>
              Items
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button className="btn logout-item" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={toggleNav}>
                <button className="btn logout-item">Login</button>
              </Link>
            )}
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
