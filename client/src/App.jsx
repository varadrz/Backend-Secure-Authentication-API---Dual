import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import Documentation from './components/Documentation';
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
          <div className="nav-brand">
            <Link to="/" style={{ fontWeight: 700, color: '#000' }}>SECURE AUTH</Link>
          </div>
          <div className="nav-links">
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
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="home-container">
                {!tokens.accessToken ? (
                  <>
                    <div className="home-hero" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                      <h1>Secure Authentication</h1>
                      <p>A minimalist implementation of enterprise-grade security for modern web applications.</p>
                      <Link to="/register" className="cta-button">Get Started</Link>
                    </div>
                    <Documentation />
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h2>Welcome back</h2>
                    <p>You are securely authenticated as <strong>{tokens.role}</strong>.</p>
                    {tokens.role === 'admin' ? (
                      <Link to="/admin" className="cta-button">Go to Admin Dashboard</Link>
                    ) : (
                      <div className="status-badge">Account Status: Active</div>
                    )}
                  </div>
                )}
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
