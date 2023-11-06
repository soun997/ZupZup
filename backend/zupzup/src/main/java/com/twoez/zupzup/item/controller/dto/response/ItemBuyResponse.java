package com.twoez.zupzup.item.controller.dto.response;

import com.twoez.zupzup.member.domain.Member;
import lombok.Builder;

@Builder
public record ItemBuyResponse(
        Long coin
) {
    public static ItemBuyResponse from(Long coin){
        return ItemBuyResponse.builder()
                .coin(coin)
                .build();
    }
}
