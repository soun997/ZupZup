package com.twoez.zupzup.item.controller;

import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.item.controller.dto.response.ItemListResponse;
import com.twoez.zupzup.item.controller.dto.response.ItemResponse;
import com.twoez.zupzup.item.service.ItemQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemQueryService itemQueryService;

    @GetMapping
    public ApiResponse<List<ItemListResponse>> itemList(){
        return ApiResponse.ok(itemQueryService.searchAll().stream()
                .map(ItemListResponse::from)
                .toList());
    }

    @GetMapping("/{itemId}")
    public ApiResponse<ItemResponse> itemDetails(
            @PathVariable Long itemId){
        return ApiResponse.ok(
                ItemResponse.from(
                        itemQueryService.search(itemId)));
    }


}
