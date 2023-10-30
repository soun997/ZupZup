package com.twoez.zupzup.member.controller.dto;

public record AuthResponse(
        boolean isNewMember,
        String accessToken,
        String refreshToken
) {

}
