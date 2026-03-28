package com.ghanamilitaryquiz.controller;

import com.ghanamilitaryquiz.dto.AdminStatisticsDto;
import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.dto.RegisterRequest;
import com.ghanamilitaryquiz.dto.UserDto;
import com.ghanamilitaryquiz.model.User;
import com.ghanamilitaryquiz.service.AdminService;
import com.ghanamilitaryquiz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatisticsDto>> getAdminStatistics() {
        try {
            AdminStatisticsDto stats = adminService.getAdminStatistics();
            return ResponseEntity.ok(ApiResponse.ok("Admin statistics retrieved successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving admin statistics: " + e.getMessage()));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            List<UserDto> userDtos = users.stream()
                    .map(this::convertToUserDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.ok("Users retrieved successfully", userDtos));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving users: " + e.getMessage()));
        }
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<UserDto>> createUser(@RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setFullName(request.getFullName());
            user.setPasswordHash(request.getPassword());
            // Default role USER, can be changed later
            User savedUser = userService.createUser(user);
            UserDto userDto = convertToUserDto(savedUser);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.ok("User created successfully", userDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred during user creation: " + e.getMessage()));
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        try {
            User userDetails = new User();
            userDetails.setFullName(userDto.getFullName());
            userDetails.setEmail(userDto.getEmail());
            if (userDto.getRole() != null) {
                userDetails.setRole(User.Role.valueOf(userDto.getRole()));
            }
            userDetails.setIsActive(userDto.getIsActive());
            
            User updatedUser = userService.updateUser(id, userDetails);
            UserDto responseDto = convertToUserDto(updatedUser);
            return ResponseEntity.ok(ApiResponse.ok("User updated successfully", responseDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred during user update: " + e.getMessage()));
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(ApiResponse.ok("User deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred during user deletion: " + e.getMessage()));
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
