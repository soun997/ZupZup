package com.twoez.zupzup.fixture.member;


import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum AuthorizationTokenFixture {
    DEFAULT("ACCESSTOKEN", "REFRESHTOKEN", "GRANTTYPE");

    private String accessToken;
    private String refreshToken;
    private String grantType;

    AuthorizationTokenFixture(String accessToken, String refreshToken, String grantType) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.grantType = grantType;
    }

    public AuthorizationToken getAuthorizationToken() {
        return new AuthorizationToken(this.accessToken, this.refreshToken, this.grantType);
    }
}
