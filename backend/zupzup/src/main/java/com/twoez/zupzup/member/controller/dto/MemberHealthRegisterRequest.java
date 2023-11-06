package com.twoez.zupzup.member.controller.dto;


import com.twoez.zupzup.member.domain.Gender;

public record MemberHealthRegisterRequest(
        Long memberId, Integer birthYear, Gender gender, Integer height, Integer weight) {}
