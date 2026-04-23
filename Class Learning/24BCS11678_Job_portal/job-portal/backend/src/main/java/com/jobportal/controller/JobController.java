package com.jobportal.controller;

import com.jobportal.dto.JobRequest;
import com.jobportal.model.Job;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;

    // Get all jobs (public)
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // Get jobs by category (public)
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Job>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(jobService.getJobsByCategory(category));
    }

    // Get single job (public)
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    // Get jobs posted by employer
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<Job>> getJobsByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(jobService.getJobsByEmployer(employerId));
    }

    // Post a job (employer only)
    @PostMapping
    public ResponseEntity<Job> createJob(
            @Valid @RequestBody JobRequest request,
            @RequestHeader("User-Id") Long employerId) {
        return ResponseEntity.ok(jobService.createJob(request, employerId));
    }

    // Edit a job (employer only)
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request,
            @RequestHeader("User-Id") Long employerId) {
        return ResponseEntity.ok(jobService.updateJob(id, request, employerId));
    }

    // Delete a job (employer only)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id,
            @RequestHeader("User-Id") Long employerId) {
        jobService.deleteJob(id, employerId);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
