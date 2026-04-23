import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicantsForJob, updateApplicationStatus } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './MyApplications.css';

export default function Applicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getApplicantsForJob(jobId, user.id)
      .then(res => setApplications(res.data))
      .catch(() => setError('Failed to load applicants'))
      .finally(() => setLoading(false));
  }, [jobId, user.id]);

  async function handleStatusChange(appId, status) {
    try {
      const res = await updateApplicationStatus(appId, status, user.id);
      setApplications(applications.map(a => a.id === appId ? res.data : a));
    } catch (err) {
      alert('Failed to update status');
    }
  }

  function statusClass(status) {
    if (status === 'ACCEPTED') return 'status-accepted';
    if (status === 'REJECTED') return 'status-rejected';
    return 'status-pending';
  }

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => navigate(-1)}>Back to Dashboard</button>
      <h2 className="page-title">Applicants</h2>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="no-data">No applicants yet for this job.</p>
      ) : (
        <table className="app-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.applicant?.name}</td>
                <td>{app.applicant?.email}</td>
                <td>{app.appliedDate}</td>
                <td><span className={`status-badge ${statusClass(app.status)}`}>{app.status}</span></td>
                <td>
                  <select
                    value={app.status}
                    onChange={e => handleStatusChange(app.id, e.target.value)}
                    style={{ padding: '4px 8px', fontSize: '13px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
