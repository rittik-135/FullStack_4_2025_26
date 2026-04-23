import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllJobs, getJobsByCategory } from '../api/api';
import './JobList.css';

const CATEGORIES = ['All', 'IT', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Engineering', 'Sales', 'Design', 'Other'];

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs(selectedCategory);
  }, [selectedCategory]);

  async function fetchJobs(category) {
    setLoading(true);
    setError('');
    try {
      let res;
      if (category === 'All') {
        res = await getAllJobs();
      } else {
        res = await getJobsByCategory(category);
      }
      setJobs(res.data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Job Listings</h2>

      {/* Category Filter */}
      <div className="category-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="no-data">No jobs found in this category.</p>
      ) : (
        <div className="job-list">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className="job-category">{job.category}</span>
              </div>
              <p className="job-company">{job.companyName}</p>
              <div className="job-meta">
                <span>Location: {job.location}</span>
                <span>Salary: {job.salary || 'Not specified'}</span>
                <span>Posted: {job.postedDate}</span>
              </div>
              <p className="job-desc">
                {job.description ? job.description.substring(0, 120) + '...' : 'No description'}
              </p>
              <Link to={`/jobs/${job.id}`} className="view-btn">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
