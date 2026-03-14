import React, { useState } from 'react';
import './login.css'; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://todo-w0i2.onrender.com/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate('/login');
      } else {
        const data = await response.json();
        // Displays the 'password mismatch' or 'username exists' errors from Django
        setError(data.password || data.error || data.username || 'Registration failed.');
      }
    } catch (err) {
      setError('Server unreachable. Please check your connection.');
    }
  };

  return (
    <div className="login-container">
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', width: '320px', textAlign: 'center' }}>
        <h2>Join TODO</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" required
            onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <input type="password" placeholder="Password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="password" placeholder="Confirm Password" required
            onChange={(e) => setFormData({...formData, password2: e.target.value})} />
          
          {error && <p style={{ color: 'red', fontSize: '0.85em' }}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '0.9em' }}>
  Already have an account? <Link to="/login" style={{ color: '#007bff', fontWeight: 'bold' }}>Login here</Link>
</p>
      </div>
    </div>
  );
};

export default Register;