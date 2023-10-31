package com.twoez.zupzup.member.controller.dto;

public record MemberHealthCreateResponse(
        Long memberId,
        String accessToken,
        String refreshToken
) {

}
