package com.twoez.zupzup.item.controller;

import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.item.controller.dto.response.ItemBuyResponse;
import com.twoez.zupzup.item.controller.dto.response.ItemListResponse;
import com.twoez.zupzup.item.controller.dto.response.ItemResponse;
import com.twoez.zupzup.item.service.ItemQueryService;
import com.twoez.zupzup.item.service.ItemService;
import com.twoez.zupzup.member.domain.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemQueryService itemQueryService;
    private final ItemService itemService;

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

    @PostMapping("/buy")
    public ApiResponse<ItemBuyResponse> itemBuy(
            @RequestParam Long itemId,
            @AuthenticationPrincipal LoginUser loginUser){
        return ApiResponse.ok(
                ItemBuyResponse.from(itemService.buy(itemId, loginUser.getMemberId()))
        );
    }

}
