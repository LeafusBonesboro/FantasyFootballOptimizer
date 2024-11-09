import React, { useState } from 'react';

const SiteAccessModal = ({ isVisible, onClose, onLoginSuccess }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSiteLogin = () => {
    fetch('https://ffopt-render.onrender.com/local_auth/local_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          onLoginSuccess();
        } else {
          alert("Login failed!");
        }
      })
      .catch(error => console.error("Error logging in:", error));
  };

  const handleSignup = () => {
    fetch('https://ffopt-render.onrender.com/local_auth/local_register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          alert("Registration successful! Please log in.");
          setIsSignupMode(false);
          setUsername('');
          setPassword('');
        } else {
          alert("Registration failed! Please try again.");
        }
      })
      .catch(error => console.error("Error registering:", error));
  };

  if (!isVisible) return null;

  return (
    <div className="SiteAccessModal-overlay">
      <div className="SiteAccessModal">
        <button onClick={onClose} className="SiteAccessModal-closeButton">X</button>
        <h2 className="SiteAccessModal-header">{isSignupMode ? "Sign Up" : "Site Access"}</h2>
        <div className="SiteAccessModal-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="SiteAccessModal-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="SiteAccessModal-input"
          />
          {isSignupMode ? (
            <>
              <button onClick={handleSignup} className="SiteAccessModal-loginButton">Sign Up</button>
              <p style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => setIsSignupMode(false)}>
                Already have an account? <span style={{ color: '#4CAF50' }}>Log in</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSiteLogin} className="SiteAccessModal-loginButton">Login</button>
              <button onClick={() => setIsSignupMode(true)} className="SiteAccessModal-signupButton">Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteAccessModal;
