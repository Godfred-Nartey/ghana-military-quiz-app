package com.ghanamilitaryquiz.controller;

import com.ghanamilitaryquiz.dto.ApiResponse;
import com.ghanamilitaryquiz.dto.CategoryDto;
import com.ghanamilitaryquiz.model.Category;
import com.ghanamilitaryquiz.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getAllCategories() {
        try {
            List<Category> categories = categoryService.getAllCategories();
            List<CategoryDto> categoryDtos = categories.stream()
                    .map(this::convertToCategoryDto)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(ApiResponse.ok("Categories retrieved successfully", categoryDtos));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving categories: " + e.getMessage()));
        }
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getActiveCategories() {
        try {
            List<Category> categories = categoryService.getActiveCategories();
            List<CategoryDto> categoryDtos = categories.stream()
                    .map(this::convertToCategoryDto)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(ApiResponse.ok("Active categories retrieved successfully", categoryDtos));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving active categories: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryDto>> getCategoryById(@PathVariable Long id) {
        try {
            Category category = categoryService.getCategoryById(id)
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            CategoryDto categoryDto = convertToCategoryDto(category);
            return ResponseEntity.ok(ApiResponse.ok("Category retrieved successfully", categoryDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while retrieving category: " + e.getMessage()));
        }
    }

    private CategoryDto convertToCategoryDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .icon(category.getIcon())
                .displayOrder(category.getDisplayOrder())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .questionCount(categoryService.getQuestionCount(category.getId()).intValue())
                .build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@RequestBody Category category) {
        try {
            Category createdCategory = categoryService.createCategory(category);
            CategoryDto categoryDto = convertToCategoryDto(createdCategory);
            return ResponseEntity.ok(ApiResponse.ok("Category created successfully", categoryDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while creating category: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryDto>> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, category);
            CategoryDto categoryDto = convertToCategoryDto(updatedCategory);
            return ResponseEntity.ok(ApiResponse.ok("Category updated successfully", categoryDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while updating category: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(ApiResponse.ok("Category deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("An error occurred while deleting category: " + e.getMessage()));
        }
    }
}
