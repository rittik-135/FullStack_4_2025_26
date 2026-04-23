import React, { useState, useEffect } from 'react';
import { getMyApplications } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './MyApplications.css';

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyApplications(user.id)
      .then(res => setApplications(res.data))
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false));
  }, [user.id]);

  function statusClass(status) {
    if (status === 'ACCEPTED') return 'status-accepted';
    if (status === 'REJECTED') return 'status-rejected';
    return 'status-pending';
  }

  return (
    <div className="page-container">
      <h2 className="page-title">My Applications</h2>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="no-data">You haven't applied for any jobs yet.</p>
      ) : (
        <table className="app-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>Location</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.job?.title}</td>
                <td>{app.job?.companyName}</td>
                <td>{app.job?.category}</td>
                <td>{app.job?.location}</td>
                <td>{app.appliedDate}</td>
                <td><span className={`status-badge ${statusClass(app.status)}`}>{app.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
