-- ============================================
-- Job Portal Database Schema
-- Run this in MySQL before starting the app
-- ============================================

CREATE DATABASE IF NOT EXISTS jobportal;
USE jobportal;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('JOB_SEEKER', 'EMPLOYER') NOT NULL
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    salary VARCHAR(100),
    location VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    posted_date DATE DEFAULT (CURRENT_DATE),
    employer_id BIGINT,
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    applicant_id BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    applied_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, applicant_id)
);

-- ============================================
-- Sample Data (Optional)
-- ============================================

INSERT INTO users (name, email, password, role) VALUES
('Alice Employer', 'alice@company.com', 'password123', 'EMPLOYER'),
('Bob Seeker', 'bob@gmail.com', 'password123', 'JOB_SEEKER');

INSERT INTO jobs (title, description, salary, location, category, company_name, employer_id) VALUES
('Java Developer', 'Build backend services using Spring Boot', '8-12 LPA', 'Bangalore', 'IT', 'TechCorp', 1),
('Marketing Manager', 'Lead digital marketing campaigns', '6-9 LPA', 'Mumbai', 'Marketing', 'BrandCo', 1),
('Financial Analyst', 'Analyze financial data and reports', '7-10 LPA', 'Delhi', 'Finance', 'FinanceHub', 1);
