import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

function getHeaders(userId) {
  const headers = { 'Content-Type': 'application/json' };
  if (userId) headers['User-Id'] = userId;
  return headers;
}

// Auth
export const register = (data) =>
  axios.post(`${BASE_URL}/auth/register`, data);

export const login = (data) =>
  axios.post(`${BASE_URL}/auth/login`, data);

// Jobs
export const getAllJobs = () =>
  axios.get(`${BASE_URL}/jobs`);

export const getJobsByCategory = (category) =>
  axios.get(`${BASE_URL}/jobs/category/${category}`);

export const getJobById = (id) =>
  axios.get(`${BASE_URL}/jobs/${id}`);

export const getJobsByEmployer = (employerId) =>
  axios.get(`${BASE_URL}/jobs/employer/${employerId}`);

export const createJob = (data, userId) =>
  axios.post(`${BASE_URL}/jobs`, data, { headers: getHeaders(userId) });

export const updateJob = (id, data, userId) =>
  axios.put(`${BASE_URL}/jobs/${id}`, data, { headers: getHeaders(userId) });

export const deleteJob = (id, userId) =>
  axios.delete(`${BASE_URL}/jobs/${id}`, { headers: getHeaders(userId) });

// Applications
export const applyForJob = (jobId, userId) =>
  axios.post(`${BASE_URL}/applications/apply/${jobId}`, {}, { headers: getHeaders(userId) });

export const getMyApplications = (userId) =>
  axios.get(`${BASE_URL}/applications/my`, { headers: getHeaders(userId) });

export const getApplicantsForJob = (jobId, userId) =>
  axios.get(`${BASE_URL}/applications/job/${jobId}`, { headers: getHeaders(userId) });

export const updateApplicationStatus = (appId, status, userId) =>
  axios.put(`${BASE_URL}/applications/${appId}/status?status=${status}`, {}, { headers: getHeaders(userId) });
