package com.twoez.zupzup.member.controller.dto;

import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.member.domain.Member;
import lombok.Builder;

@Builder
public record AuthResponse(
        boolean isNewMember,
        String accessToken,
        String refreshToken,
        Member member
) {

    public static AuthResponse from(AuthorizationToken authorizationToken, Member member) {
        return AuthResponse.builder()
                .isNewMember(false)
                .accessToken(authorizationToken.getAccessToken())
                .refreshToken(authorizationToken.getRefreshToken())
                .member(member)
                .build();
    }

    public static AuthResponse unregisteredUser(Member member) {
        return AuthResponse.builder()
                .isNewMember(true)
                .member(member)
                .build();
    }

}
