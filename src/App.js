import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router basename="/TODO">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={() => window.location.href='/TODO/'} />
        } />
        <Route path="/" element={
          isAuthenticated ? <Home onLogout={() => { localStorage.removeItem('authToken'); window.location.reload(); }} /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;