package com.twoez.zupzup.fixture.member;


import com.twoez.zupzup.member.domain.AuthProvider;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.OAuth;
import com.twoez.zupzup.member.domain.Role;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum MemberFixture {
    DEFAULT;

    private Long id = 1L;
    private AuthProvider oauthProvider = AuthProvider.GOOGLE;
    private String oauthAccount = "1234567";
    private String name = "줍줍이";
    private String gender = "M";
    private Integer birthYear = 2000;
    private Integer height = 180;
    private Integer weight = 80;
    private Long coin = 200L;
    private List<Role> role = new ArrayList<>(List.of(Role.ROLE_USER));
    private Boolean isDeleted = false;

    public Member getMember() {
        return Member.builder()
                .id(id)
                .oAuth(new OAuth(oauthProvider, oauthAccount))
                .name(name)
                .gender(gender)
                .birthYear(birthYear)
                .height(height)
                .weight(weight)
                .coin(coin)
                .role(role)
                .isDeleted(isDeleted)
                .build();
    }

    public Member getMemberNoneId() {
        return Member.builder()
                .oAuth(new OAuth(oauthProvider, oauthAccount))
                .name(name)
                .gender(gender)
                .birthYear(birthYear)
                .height(height)
                .weight(weight)
                .coin(coin)
                .role(role)
                .isDeleted(isDeleted)
                .build();
    }
}
