package com.jobportal.controller;

import com.jobportal.model.Application;
import com.jobportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Apply for a job (job seeker)
    @PostMapping("/apply/{jobId}")
    public ResponseEntity<Application> apply(
            @PathVariable Long jobId,
            @RequestHeader("User-Id") Long applicantId) {
        return ResponseEntity.ok(applicationService.applyForJob(jobId, applicantId));
    }

    // Get my applications (job seeker)
    @GetMapping("/my")
    public ResponseEntity<List<Application>> getMyApplications(
            @RequestHeader("User-Id") Long applicantId) {
        return ResponseEntity.ok(applicationService.getMyApplications(applicantId));
    }

    // Get applicants for a job (employer)
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicantsForJob(
            @PathVariable Long jobId,
            @RequestHeader("User-Id") Long employerId) {
        return ResponseEntity.ok(applicationService.getApplicantsForJob(jobId, employerId));
    }

    // Update application status (employer)
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            @RequestHeader("User-Id") Long employerId) {
        return ResponseEntity.ok(applicationService.updateStatus(applicationId, status, employerId));
    }
}
