package com.twoez.zupzup.item.controller.dto.response;


import com.twoez.zupzup.item.domain.Item;
import lombok.Builder;

@Builder
public record ItemResponse(
        Long id, String name, String description, Integer exp, Long price, String itemImgUrl) {
    public static ItemResponse from(Item item) {
        return ItemResponse.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .exp(item.getExp())
                .price(item.getPrice())
                .itemImgUrl(item.getItemImgUrl())
                .build();
    }
}
