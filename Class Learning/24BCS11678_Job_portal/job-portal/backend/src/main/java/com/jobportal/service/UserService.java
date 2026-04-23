package com.jobportal.service;

import com.jobportal.dto.AuthResponse;
import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.RegisterRequest;
import com.jobportal.model.User;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Plain password storage (beginner-friendly; use BCrypt in production)
        user.setPassword(request.getPassword());
        user.setRole(User.Role.valueOf(request.getRole()));

        User saved = userRepository.save(user);
        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(),
                saved.getRole().name(), "Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(user.getId(), user.getName(), user.getEmail(),
                user.getRole().name(), "Login successful");
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
