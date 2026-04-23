import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyForJob } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './JobDetail.css';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    getJobById(id)
      .then(res => setJob(res.data))
      .catch(() => navigate('/jobs'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  async function handleApply() {
    if (!user) {
      navigate('/login');
      return;
    }
    setApplying(true);
    setError('');
    setMessage('');
    try {
      await applyForJob(id, user.id);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  }

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!job) return null;

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

      <div className="detail-card">
        <div className="detail-header">
          <h2>{job.title}</h2>
          <span className="job-category">{job.category}</span>
        </div>

        <p className="detail-company">{job.companyName}</p>

        <table className="detail-table">
          <tbody>
            <tr><td>Location</td><td>{job.location}</td></tr>
            <tr><td>Salary</td><td>{job.salary || 'Not specified'}</td></tr>
            <tr><td>Posted Date</td><td>{job.postedDate}</td></tr>
            <tr><td>Posted By</td><td>{job.employer?.name}</td></tr>
          </tbody>
        </table>

        <div className="detail-section">
          <h3>Job Description</h3>
          <p>{job.description || 'No description provided.'}</p>
        </div>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        {user && user.role === 'JOB_SEEKER' && (
          <button className="apply-btn" onClick={handleApply} disabled={applying}>
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        )}

        {!user && (
          <p className="auth-link" style={{ marginTop: '16px' }}>
            <a href="/login">Login</a> to apply for this job.
          </p>
        )}
      </div>
    </div>
  );
}
