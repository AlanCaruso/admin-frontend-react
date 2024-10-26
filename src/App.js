import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import ItemList from "./components/ItemList";
import Nav from "./components/Nav";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };
  return (
    <Router>
      <div>
        {/* Show navigation bar */}
        <Nav
          onLogin={isLoggedIn}
          onLogout={handleLogout}
          isAuthenticated={isLoggedIn}
        />
        {/* Accesible content routes */}
        <Routes>
          <Route path="/" element={<ItemList />} />
          {isLoggedIn ? (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/items" element={<ItemList />} />
              {/* Redirect to /items when logged in */}
              <Route path="/login" element={<Navigate to="/items" />} />
            </>
          ) : (
            <>
              {/* Redirect to /login when trying to access /about while logged out */}
              <Route path="/about" element={<Navigate to="/login" />} />
              <Route path="/items" element={<ItemList />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
