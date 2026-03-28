package com.ghanamilitaryquiz.controller;

import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.dto.AuthResponse;
import com.ghanamilitaryquiz.dto.LoginRequest;
import com.ghanamilitaryquiz.dto.RegisterRequest;
import com.ghanamilitaryquiz.dto.UserDto;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.service.UserService;
import com.ghanamilitaryquiz.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            // Validate input
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Username is required"));
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Email is required"));
            }
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Password must be at least 6 characters"));
            }

            // Create user
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setFullName(request.getFullName());
            user.setPasswordHash(request.getPassword());

            User savedUser = userService.createUser(user);

            // Generate token and create auth response
           String token = jwtTokenProvider.generateTokenFromUsername(savedUser.getUsername(), savedUser.getRole().name());
            UserDto userDto = convertToUserDto(savedUser);
            AuthResponse authResponse = AuthResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .expiresIn(3600)
                    .user(userDto)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("User registered successfully", authResponse));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An error occurred during registration: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            // Manual authentication
            User user = userService.getUserByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Account is disabled"));
            }
            
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid username or password"));
            }
            
            // Create a simple token (without full authentication)
           String token = jwtTokenProvider.generateTokenFromUsername(user.getUsername(), user.getRole().name());
            // Update last login
            userService.updateLastLogin(user.getId());

            UserDto userDto = convertToUserDto(user);
            AuthResponse authResponse = AuthResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .expiresIn(3600)
                    .user(userDto)
                    .build();

            return ResponseEntity.ok(ApiResponse.ok("Login successful", authResponse));

        } catch (RuntimeException e) {
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid username or password"));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An error occurred during login: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An error occurred during login: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            String username = jwtTokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserDto userDto = convertToUserDto(user);
            return ResponseEntity.ok(ApiResponse.ok("Current user retrieved successfully", userDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving current user: " + e.getMessage()));
        }
    }

    private UserDto convertToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().toString())
                .isActive(user.getIsActive())
                .build();
    }
}
