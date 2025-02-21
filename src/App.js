import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Categories from "./components/Categories";
import ItemList from "./components/ItemList";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

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
      <ThemeProvider>
        <div>
          {/* Show navigation bar */}
          <Nav
            onLogin={isLoggedIn}
            onLogout={handleLogout}
            isAuthenticated={isLoggedIn}
          />
          {/* Accesible content routes */}
          <Routes>
            <Route path="/" element={<ItemList isLoggedIn={isLoggedIn} />} />
            {isLoggedIn ? (
              <>
                <Route
                  path="/categories"
                  element={<Categories isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/items"
                  element={<ItemList isLoggedIn={isLoggedIn} />}
                />
                {/* Redirect to /items when logged in */}
                <Route path="/login" element={<Navigate to="/items" />} />
              </>
            ) : (
              <>
                <Route path="/categories" element={<Navigate to="/login" />} />
                <Route
                  path="/items"
                  element={<ItemList isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
              </>
            )}
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
