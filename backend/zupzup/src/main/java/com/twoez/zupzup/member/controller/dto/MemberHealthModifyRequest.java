package com.twoez.zupzup.member.controller.dto;


import com.twoez.zupzup.member.domain.Gender;

public record MemberHealthModifyRequest(
        Integer birthYear, Gender gender, Integer height, Integer weight) {}
