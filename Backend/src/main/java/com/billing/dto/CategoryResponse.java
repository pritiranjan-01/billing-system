package com.billing.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private String categoryId;
    private String name;
    private String description;
    private String bgColor;
    private String imgUrl;
    private String createdAt;
    private String updatedAt;
    private Integer itemCount;
}
