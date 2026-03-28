package com.ghanamilitaryquiz.service;

import com.ghanamilitaryquiz.model.Category;
import com.ghanamilitaryquiz.repository.CategoryRepository;
import com.ghanamilitaryquiz.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public List<Category> getActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }
    
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
    
    @Transactional
    public Category createCategory(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw new RuntimeException("Category name already exists");
        }
        return categoryRepository.save(category);
    }
    
    @Transactional
    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        if (categoryDetails.getName() != null && !categoryDetails.getName().equals(category.getName())) {
            if (categoryRepository.existsByName(categoryDetails.getName())) {
                throw new RuntimeException("Category name already exists");
            }
            category.setName(categoryDetails.getName());
        }
        if (categoryDetails.getDescription() != null) {
            category.setDescription(categoryDetails.getDescription());
        }
        if (categoryDetails.getIcon() != null) {
            category.setIcon(categoryDetails.getIcon());
        }
        if (categoryDetails.getDisplayOrder() != null) {
            category.setDisplayOrder(categoryDetails.getDisplayOrder());
        }
        if (categoryDetails.getIsActive() != null) {
            category.setIsActive(categoryDetails.getIsActive());
        }
        
        return categoryRepository.save(category);
    }
    
@Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        questionRepository.deleteByCategoryId(id);
        categoryRepository.deleteById(id);
    }

    public Long getQuestionCount(Long categoryId) {
        return questionRepository.countByCategoryId(categoryId);
    }
}