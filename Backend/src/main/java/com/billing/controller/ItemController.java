package com.billing.controller;

import com.billing.dto.ItemRequest;
import com.billing.dto.ItemResponse;
import com.billing.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse createItem(@RequestPart String itemRequestString,
                                   @RequestPart MultipartFile file) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ItemRequest itemRequest = mapper.readValue(itemRequestString, ItemRequest.class);
        return itemService.add(itemRequest, file);
    }

    @GetMapping("/item")
    public List<ItemResponse> getItem()  {
        return itemService.fetchAll();
    }

    @DeleteMapping("/admin/item/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable String itemId) {
        itemService.delete(itemId);
    }

}
