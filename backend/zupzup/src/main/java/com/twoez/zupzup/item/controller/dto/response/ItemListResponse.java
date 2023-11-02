package com.twoez.zupzup.item.controller.dto.response;

import com.twoez.zupzup.item.domain.Item;
import lombok.Builder;

@Builder
public record ItemListResponse(
        String name,
        String description,
        Integer exp,
        Integer price,
        String itemImgUrl
) {
    public static ItemListResponse from(Item item){
        return ItemListResponse.builder()
                .name(item.getName())
                .description(item.getDescription())
                .exp(item.getExp())
                .price(item.getPrice())
                .itemImgUrl(item.getItemImgUrl())
                .build();
    }

}
