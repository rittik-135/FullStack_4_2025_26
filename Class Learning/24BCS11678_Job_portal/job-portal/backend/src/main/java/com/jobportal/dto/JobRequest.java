package com.jobportal.dto;

import jakarta.validation.constraints.NotBlank;

public class JobRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String salary;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Company name is required")
    private String companyName;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
}
