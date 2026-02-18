package com.billing.service;

import com.billing.dto.CategoryRequest;
import com.billing.dto.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
   CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file);
   List<CategoryResponse> read();
   void delete(String id);
}
