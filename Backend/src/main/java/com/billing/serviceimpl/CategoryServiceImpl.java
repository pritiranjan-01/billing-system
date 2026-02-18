package com.billing.serviceimpl;

import com.billing.dto.CategoryRequest;
import com.billing.dto.CategoryResponse;
import com.billing.entity.Category;
import com.billing.repository.CategoryRepository;
import com.billing.repository.ItemRepository;
import com.billing.service.CategoryService;
import com.billing.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepo;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepo;

    @Override
    public CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file) {
        String imgURL = fileUploadService.upload(file, "category-assets");
       Category category = convertToCategoryEntity(categoryRequest);
       category.setImgUrl(imgURL);
       Category newCategory = categoryRepo.save(category);
       return convertToCategoryResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepo.findAll()
                .stream()
                .map(e -> convertToCategoryResponse(e))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        Category category = categoryRepo.findByCategoryId(id)
                .orElseThrow(()-> new RuntimeException("Category not found"));
        fileUploadService.delete(category.getImgUrl());
            categoryRepo.delete(category);
    }

    private CategoryResponse convertToCategoryResponse(Category newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .itemCount(itemRepo.countByCategoryId(newCategory.getId())) // Per Category Item Counts
                .build();
    }

    private Category convertToCategoryEntity(CategoryRequest categoryRequest) {
        return Category.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .bgColor(categoryRequest.getBgColor())
                .build();
    }
}
