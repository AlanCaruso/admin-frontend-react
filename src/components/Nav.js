import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Nav.css";

const Nav = ({ onLogout, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        {isAuthenticated ? <Link to="/">Admin</Link> : <Link to="/">User</Link>}
      </div>
      <div className="nav-menu">
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
        </ul>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ThemeToggle />
        <ul>
          <li>
            {isAuthenticated ? (
              <button
                className="btn btn-outlined logout-item"
                onClick={onLogout}
              >
                Logout
                <i className="fas fa-sign-out-alt"></i>
              </button>
            ) : (
              <Link to="/login" onClick={toggleNav}>
                <button className="btn login-item">
                  Login
                  <i className="fas fa-sign-in-alt"></i>
                </button>
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
