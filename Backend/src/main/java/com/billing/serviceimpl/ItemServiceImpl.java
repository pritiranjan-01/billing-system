package com.billing.serviceimpl;

import com.billing.dto.ItemRequest;
import com.billing.dto.ItemResponse;
import com.billing.entity.Category;
import com.billing.entity.Item;
import com.billing.repository.CategoryRepository;
import com.billing.repository.ItemRepository;
import com.billing.service.FileUploadService;
import com.billing.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;


    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        Category existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        String imgUrl = fileUploadService.upload(file,"item-assets");
        Item newItem = convertToItemEntity(request, imgUrl, existingCategory);
        Item saveItem = itemRepository.save(newItem);
        return convertToItemResponse(saveItem);
    }

    private ItemResponse convertToItemResponse(Item saveItem) {
        return ItemResponse.builder()
                .itemId(saveItem.getItemId())
                .price(saveItem.getPrice())
                .description(saveItem.getDescription())
                .name(saveItem.getName())
                .createDate(saveItem.getCreatedAt())
                .updateDate(saveItem.getUpdatedAt())
                .categoryId(saveItem.getCategory().getCategoryId())
                .categoryName(saveItem.getCategory().getName())
                .imageUrl(saveItem.getImgUrl())
                .build();
    }

    private Item convertToItemEntity(ItemRequest request, String imgUrl, Category existingCategory) {
        return Item.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .category(existingCategory)
                .imgUrl(imgUrl)
                .build();
    }

    @Override
    public List<ItemResponse> fetchAll() {
        return itemRepository.findAll()
                .stream()
                .map(item -> convertToItemResponse(item))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String itemId) {
        Item item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        Boolean deleted = fileUploadService.delete(item.getImgUrl());
        if (deleted) {
            itemRepository.delete(item);
        } else {
            throw new RuntimeException("Unable to delete item Image");
        }
    }
}
