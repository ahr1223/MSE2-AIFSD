import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem('token'));
    };

    // Check token on mount
    checkToken();

    // Listen for storage changes (for cross-tab sync)
    window.addEventListener('storage', checkToken);

    // Custom event for login/logout
    window.addEventListener('authChange', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
      window.removeEventListener('authChange', checkToken);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
