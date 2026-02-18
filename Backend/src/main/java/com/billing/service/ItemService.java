package com.billing.service;

import com.billing.dto.ItemRequest;
import com.billing.dto.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
   ItemResponse add(ItemRequest request, MultipartFile file);

   List<ItemResponse> fetchAll();

   void delete(String itemId);
}
