package com.twoez.zupzup.config.security.jwt;

import com.twoez.zupzup.member.domain.AuthUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

public abstract class IdTokenValidator {

    private final JwtValidator jwtValidator;
    private final OidcProperty oidcProperty;

    public IdTokenValidator(JwtValidator jwtValidator, OidcProperty oidcProperty) {
        this.jwtValidator = jwtValidator;
        this.oidcProperty = oidcProperty;
    }

//    public AuthUser

}
