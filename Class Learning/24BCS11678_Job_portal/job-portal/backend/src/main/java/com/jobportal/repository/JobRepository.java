package com.jobportal.repository;

import com.jobportal.model.Job;
import com.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployer(User employer);
    List<Job> findByCategory(String category);
    List<Job> findByCategoryIgnoreCase(String category);
}
