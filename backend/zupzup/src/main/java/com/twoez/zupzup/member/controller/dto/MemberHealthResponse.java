package com.twoez.zupzup.member.controller.dto;


import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.domain.Member;
import lombok.Builder;

@Builder
public record MemberHealthResponse(
        Gender gender, Integer birthYear, Integer height, Integer weight) {

    public static MemberHealthResponse from(Member member) {
        return MemberHealthResponse.builder()
                .gender(member.getGender())
                .birthYear(member.getBirthYear())
                .height(member.getHeight())
                .weight(member.getWeight())
                .build();
    }
}
