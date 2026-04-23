import React, { useState } from "react";
import "./App.css";

const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TCS",
    location: "Mumbai",
    experience: "3-5 years",
    salary: "₹8,00,000 - ₹15,00,000",
    category: "IT",
    applied: false,
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Infosys",
    location: "Bangalore",
    experience: "2-4 years",
    salary: "₹10,00,000 - ₹18,00,000",
    category: "IT",
    applied: false,
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "HDFC Bank",
    location: "Delhi",
    experience: "5-7 years",
    salary: "₹12,00,000 - ₹20,00,000",
    category: "Marketing",
    applied: false,
  },
];

function App() {
  const [jobs, setJobs] = useState(jobsData);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const handleSearch = () => {
    const filtered = jobsData.filter((job) => {
      return (
        job.title.toLowerCase().includes(keyword.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        job.experience.includes(experience)
      );
    });
    setJobs(filtered);
  };

  const handleApply = (id) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, applied: true } : job
    );
    setJobs(updated);
  };

  const handleCategory = (cat) => {
    const filtered = jobsData.filter((job) =>
      job.category.toLowerCase().includes(cat.toLowerCase())
    );
    setJobs(filtered);
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <h2 className="logo">NaukriHub</h2>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Companies</a>
          <a href="#">Recruiters</a>
        </div>
        <div className="auth">
          <button onClick={() => alert("Login coming soon")}>Login</button>
          <button onClick={() => alert("Register coming soon")}>
            Register
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Find Your Dream Job in India</h1>
        <p>Explore thousands of job opportunities from top companies</p>
      </section>

      {/* SEARCH */}
      <div className="search">
        <input
          placeholder="Keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Experience"
          onChange={(e) => setExperience(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CATEGORIES */}
      <h2>Categories</h2>
      <div className="categories">
        <div onClick={() => handleCategory("IT")}>💻 IT</div>
        <div onClick={() => handleCategory("Banking")}>💼 Banking</div>
        <div onClick={() => handleCategory("Engineering")}>🏭 Engineering</div>
        <div onClick={() => handleCategory("Finance")}>📊 Finance</div>
        <div onClick={() => handleCategory("Teaching")}>🎓 Teaching</div>
        <div onClick={() => handleCategory("Healthcare")}>🏥 Healthcare</div>
      </div>

      {/* JOB LIST */}
      <h2>Jobs</h2>
      <div className="jobs">
        {jobs.length === 0 ? (
          <p>No jobs found. Maybe your filter is too smart.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}, {job.location}</p>
              <p>{job.experience}</p>
              <p className="salary">{job.salary}</p>

              <button
                disabled={job.applied}
                onClick={() => handleApply(job.id)}
              >
                {job.applied ? "Applied ✓" : "Apply"}
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 NaukriHub</p>
      </footer>
    </div>
  );
}

export default App;