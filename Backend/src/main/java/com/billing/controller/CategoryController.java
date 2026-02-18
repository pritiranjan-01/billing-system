package com.billing.controller;

import com.billing.dto.CategoryRequest;
import com.billing.dto.CategoryResponse;
import com.billing.service.CategoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/admin/category")
    public ResponseEntity<CategoryResponse> addcategory(
            @RequestPart("categoryRequest") String categoryRequest,
            @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            CategoryRequest category = mapper.readValue(categoryRequest, CategoryRequest.class);
            CategoryResponse serviceRes = categoryService.add(category,file);
            return new ResponseEntity(serviceRes, HttpStatus.CREATED);
        } catch (IllegalArgumentException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> fetchCategory() {
        List<CategoryResponse> responses = categoryService.read();
        return new ResponseEntity(responses, HttpStatus.OK);
    }

    @DeleteMapping("/admin/category/{categoryId}")
    public ResponseEntity deleteById(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
