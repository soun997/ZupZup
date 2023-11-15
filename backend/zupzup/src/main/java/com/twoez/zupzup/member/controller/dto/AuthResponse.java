package com.twoez.zupzup.member.controller.dto;


import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.member.domain.Member;
import lombok.Builder;

@Builder
public record AuthResponse(
        boolean isNewMember,
        String accessToken,
        String refreshToken,
        Long memberId,
        String memberName) {

    public static AuthResponse from(AuthorizationToken authorizationToken, Member member) {
        return AuthResponse.builder()
                .isNewMember(false)
                .accessToken(authorizationToken.getAccessToken())
                .refreshToken(authorizationToken.getRefreshToken())
                .memberId(member.getId())
                .memberName(member.getName())
                .build();
    }

    public static AuthResponse unregisteredUser(Long memberId, String memberName) {
        return AuthResponse.builder()
                .isNewMember(true)
                .memberId(memberId)
                .memberName(memberName)
                .build();
    }
}
