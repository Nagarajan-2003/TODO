import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const LoginCard = ({ username, setUsername, password, setPassword, handleLogin, error }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '300px',
      textAlign: 'center'
    }}>
      <h2>TODO</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        {error && <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '10px' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Add this link here */}
      <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
        Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
      </p>
    </div>
  );
};

export default LoginCard;