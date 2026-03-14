import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router basename="/TODO">
      <Routes>
        {/* 1. Change the root path (/) to go to Register if not authenticated */}
        <Route path="/" element={
          isAuthenticated ? <Home onLogout={() => { localStorage.removeItem('authToken'); window.location.reload(); }} /> : <Navigate to="/register" />
        } />

        {/* 2. Define the Register route */}
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" /> : <Register />
        } />

        {/* 3. Keep the Login route accessible */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={() => window.location.href='/TODO/'} />
        } />
      </Routes>
    </Router>
  );
}

export default App;