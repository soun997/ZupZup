package com.twoez.zupzup.member.domain;

import lombok.Builder;
import lombok.ToString;

@Builder
@ToString
public class AuthUser {

    private OauthProvider oauthProvider;
    private String oauthAccount;
    private String name;

    public AuthUser(OauthProvider oauthProvider, String oauthAccount, String name) {
        this.oauthProvider = oauthProvider;
        this.oauthAccount = oauthAccount;
        this.name = name;
    }

    public Oauth getOauth() {
        return new Oauth(oauthProvider, oauthAccount);
    }
}
