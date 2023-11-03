package com.twoez.zupzup.member.controller.dto;

import com.twoez.zupzup.member.domain.Member;
import java.time.LocalDateTime;

public record MemberProfileResponse(Long memberId,
                                    String name,
                                    Long coin,
                                    LocalDateTime createdAt) {

    public static MemberProfileResponse of(Member member) {

        return new MemberProfileResponse(
                member.getId(),
                member.getName(),
                member.getCoin(),
                member.getCreatedAt());
    }
}
