import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobsByEmployer, deleteJob } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './EmployerDashboard.css';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getJobsByEmployer(user.id)
      .then(res => setJobs(res.data))
      .catch(() => setError('Failed to load jobs'))
      .finally(() => setLoading(false));
  }, [user.id]);

  async function handleDelete(jobId) {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJob(jobId, user.id);
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  }

  return (
    <div className="page-container">
      <div className="employer-header">
        <div>
          <h2 className="page-title">Welcome, {user.name}</h2>
          <p className="role-badge">Role: Employer</p>
        </div>
        <Link to="/post-job" className="post-job-btn">+ Post New Job</Link>
      </div>

      <h3 className="section-title">Your Job Postings</h3>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="no-data">No jobs posted yet. <Link to="/post-job">Post your first job</Link></p>
      ) : (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Posted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>
                <td>{job.postedDate}</td>
                <td className="action-btns">
                  <Link to={`/applicants/${job.id}`} className="btn-view">Applicants</Link>
                  <Link to={`/edit-job/${job.id}`} className="btn-edit">Edit</Link>
                  <button onClick={() => handleDelete(job.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
