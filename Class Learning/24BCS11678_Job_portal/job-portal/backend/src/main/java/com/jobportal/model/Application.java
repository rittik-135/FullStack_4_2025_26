package com.jobportal.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "applicant_id")
    private User applicant;

    private String status = "PENDING";

    private LocalDate appliedDate = LocalDate.now();

    // Constructors
    public Application() {}

    public Application(Job job, User applicant) {
        this.job = job;
        this.applicant = applicant;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getApplicant() { return applicant; }
    public void setApplicant(User applicant) { this.applicant = applicant; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }
}
