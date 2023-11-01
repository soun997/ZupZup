package com.twoez.zupzup.fixture.member;


import com.twoez.zupzup.member.domain.AuthProvider;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.OAuth;
import com.twoez.zupzup.member.domain.Role;
import java.util.List;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum MemberFixture {
    DEFAULT(
            1L,
            AuthProvider.GOOGLE,
            "1234567",
            "줍줍이",
            'M',
            2000,
            180,
            80,
            200L,
            List.of(Role.ROLE_USER),
            false),
    NONE_ID(
            null,
            AuthProvider.GOOGLE,
            "1234567",
            "줍줍이",
            'M',
            2000,
            180,
            80,
            200L,
            List.of(Role.ROLE_USER),
            false);

    private Long id;
    private AuthProvider oauthProvider;
    private String oauthAccount;
    private String name;
    private Character gender;
    private Integer birthYear;
    private Integer height;
    private Integer weight;
    private Long coin;
    private List<Role> role;
    private Boolean isDeleted;

    MemberFixture(
            Long id,
            AuthProvider oauthProvider,
            String oauthAccount,
            String name,
            Character gender,
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
