package com.jobportal.service;

import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobService jobService;

    @Autowired
    private UserService userService;

    public Application applyForJob(Long jobId, Long applicantId) {
        Job job = jobService.getJobById(jobId);
        User applicant = userService.findById(applicantId);

        if (applicant.getRole() != User.Role.JOB_SEEKER) {
            throw new RuntimeException("Only job seekers can apply for jobs");
        }

        if (applicationRepository.existsByJobAndApplicant(job, applicant)) {
            throw new RuntimeException("You have already applied for this job");
        }

        Application application = new Application(job, applicant);
        return applicationRepository.save(application);
    }

    public List<Application> getMyApplications(Long applicantId) {
        User applicant = userService.findById(applicantId);
        return applicationRepository.findByApplicant(applicant);
    }

    public List<Application> getApplicantsForJob(Long jobId, Long employerId) {
        Job job = jobService.getJobById(jobId);

        if (!job.getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("You can only view applicants for your own jobs");
        }

        return applicationRepository.findByJob(job);
    }

    public Application updateStatus(Long applicationId, String status, Long employerId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (!application.getJob().getEmployer().getId().equals(employerId)) {
            throw new RuntimeException("Unauthorized");
        }

        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
