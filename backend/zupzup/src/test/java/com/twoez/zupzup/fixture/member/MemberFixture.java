package com.twoez.zupzup.fixture.member;


import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.Oauth;
import com.twoez.zupzup.member.domain.OauthProvider;
import com.twoez.zupzup.member.domain.Role;
import java.util.List;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum MemberFixture {
    DEFAULT(
            1L,
            OauthProvider.GOOGLE,
            "1234567",
            "줍줍이",
            Gender.M,
            2000,
            180,
            80,
            200L,
            List.of(Role.ROLE_USER),
            false),
    NONE_ID(
            null,
            OauthProvider.GOOGLE,
            "1234567",
            "줍줍이",
            Gender.M,
            2000,
            180,
            80,
            200L,
            List.of(Role.ROLE_USER),
            false);

    private Long id;
    private OauthProvider oauthProvider;
    private String oauthAccount;
    private String name;
    private Gender gender;
    private Integer birthYear;
    private Integer height;
    private Integer weight;
    private Long coin;
    private List<Role> role;
    private Boolean isDeleted;

    MemberFixture(
            Long id,
            OauthProvider oauthProvider,
            String oauthAccount,
            String name,
            Gender gender,
            Integer birthYear,
            Integer height,
            Integer weight,
            Long coin,
            List<Role> role,
            Boolean isDeleted) {
        this.id = id;
        this.oauthProvider = oauthProvider;
        this.oauthAccount = oauthAccount;
        this.name = name;
        this.gender = gender;
        this.birthYear = birthYear;
        this.height = height;
        this.weight = weight;
        this.coin = coin;
        this.role = role;
        this.isDeleted = isDeleted;
    }

    public Member getMember() {
        return Member.builder()
                .id(id)
                .oauth(new Oauth(oauthProvider, oauthAccount))
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
