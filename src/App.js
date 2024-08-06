import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ItemList from './components/ItemList';
import Nav from './components/Nav';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  }

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/items" element={<ItemList />} />
            </Routes>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
          </>
        )}

      </div>
    </Router >
  );
};

export default App;
