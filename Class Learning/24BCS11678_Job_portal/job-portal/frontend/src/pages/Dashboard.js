import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmployerDashboard from './EmployerDashboard';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();

  if (user.role === 'EMPLOYER') {
    return <EmployerDashboard />;
  }

  // Job Seeker Dashboard
  return (
    <div className="page-container">
      <h2 className="page-title">Welcome, {user.name}</h2>
      <p className="role-badge">Role: Job Seeker</p>
      <div className="dashboard-links">
        <Link to="/jobs" className="dash-card">
          <h3>Browse Jobs</h3>
          <p>Find and apply for jobs</p>
        </Link>
        <Link to="/my-applications" className="dash-card">
          <h3>My Applications</h3>
          <p>Track your job applications</p>
        </Link>
      </div>
    </div>
  );
}
