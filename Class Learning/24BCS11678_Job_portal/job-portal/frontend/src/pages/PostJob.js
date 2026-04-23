import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const CATEGORIES = ['IT', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Engineering', 'Sales', 'Design', 'Other'];

export default function PostJob() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: '', description: '', salary: '',
    location: '', category: 'IT', companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createJob(form, user.id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Post a New Job</h2>
      <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '6px', padding: '28px', maxWidth: '600px' }}>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Software Engineer" required />
          </div>
          <div className="form-group">
            <label>Company Name *</label>
            <input type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your company name" required />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Location *</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai, India" required />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input type="text" name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. 5-8 LPA" />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the role and responsibilities..." rows={5} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            <button type="button" onClick={() => navigate(-1)} style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: 'white', fontSize: '15px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
