package com.twoez.zupzup.item.controller.dto.response;


import com.twoez.zupzup.item.domain.Item;
import lombok.Builder;

@Builder
public record ItemListResponse(Long id, String name, String itemImgUrl) {
    public static ItemListResponse from(Item item) {
        return ItemListResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .itemImgUrl(item.getItemImgUrl())
                .build();
    }
}
