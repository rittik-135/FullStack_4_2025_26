import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/jobs">Job Portal</Link>
      </div>
      <div className="navbar-links">
        <Link to="/jobs">All Jobs</Link>

        {user && user.role === 'EMPLOYER' && (
          <>
            <Link to="/post-job">Post Job</Link>
            <Link to="/dashboard">My Jobs</Link>
          </>
        )}

        {user && user.role === 'JOB_SEEKER' && (
          <Link to="/my-applications">My Applications</Link>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <div className="navbar-user">
            <span>Hello, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
