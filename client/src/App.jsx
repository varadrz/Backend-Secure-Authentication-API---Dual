import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [tokens, setTokens] = useState({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    role: localStorage.getItem('role')
  });

  const logout = () => {
    localStorage.clear();
    setTokens({ accessToken: null, refreshToken: null, role: null });
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          {!tokens.accessToken ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {tokens.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h1>Secure Auth MERN</h1>
                <p>This is the home page. Please login to access protected features.</p>
                {tokens.accessToken && <p>You are logged in as {tokens.role}.</p>}
              </div>
            } />
            <Route path="/login" element={<Login setTokens={setTokens} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={
              tokens.accessToken && tokens.role === 'admin'
                ? <AdminDashboard />
                : <Navigate to="/login" />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
