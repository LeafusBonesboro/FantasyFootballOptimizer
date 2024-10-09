// src/components/Login.jsx
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Redirect user to backend route that starts Yahoo OAuth
    window.location.href = "https://84d7-2603-6080-3700-47b5-9402-e585-e552-c7f6.ngrok-free.app/auth/login";

  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Yahoo</button>
    </div>
  );
};

export default Login;
