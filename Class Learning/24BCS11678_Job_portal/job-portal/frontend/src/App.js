import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import EditJob from './pages/EditJob';
import MyApplications from './pages/MyApplications';
import Applicants from './pages/Applicants';

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute role="EMPLOYER"><PostJob /></PrivateRoute>} />
          <Route path="/edit-job/:id" element={<PrivateRoute role="EMPLOYER"><EditJob /></PrivateRoute>} />
          <Route path="/my-applications" element={<PrivateRoute role="JOB_SEEKER"><MyApplications /></PrivateRoute>} />
          <Route path="/applicants/:jobId" element={<PrivateRoute role="EMPLOYER"><Applicants /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
