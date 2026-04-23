package com.jobportal.service;

import com.jobportal.dto.JobRequest;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserService userService;

    public Job createJob(JobRequest request, Long employerId) {
        User employer = userService.findById(employerId);

        if (employer.getRole() != User.Role.EMPLOYER) {
            throw new RuntimeException("Only employers can post jobs");
        }

        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setCategory(request.getCategory());
        job.setCompanyName(request.getCompanyName());
        job.setEmployer(employer);

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getJobsByCategory(String category) {
        return jobRepository.findByCategoryIgnoreCase(category);
    }

    public List<Job> getJobsByEmployer(Long employerId) {
        User employer = userService.findById(employerId);
        return jobRepository.findByEmployer(employer);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
    }

    public Job updateJob(Long jobId, JobRequest request, Long employerId) {
        Job job = getJobById(jobId);

        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("You can only edit your own jobs");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setCategory(request.getCategory());
        job.setCompanyName(request.getCompanyName());

        return jobRepository.save(job);
    }

    public void deleteJob(Long jobId, Long employerId) {
        Job job = getJobById(jobId);

        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("You can only delete your own jobs");
        }

        jobRepository.delete(job);
    }
}
