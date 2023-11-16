package com.twoez.zupzup.item.controller.dto.response;


import lombok.Builder;

@Builder
public record ItemBuyResponse(Long coin) {
    public static ItemBuyResponse from(Long coin) {
        return ItemBuyResponse.builder().coin(coin).build();
    }
}
