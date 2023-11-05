package com.twoez.zupzup.global.util;

import org.springframework.util.StringUtils;

public class AuthorizationTokenUtils {
    public static final String GRANT_TYPE_BEARER = "Bearer ";

    public static boolean isValidBearerToken(String bearerToken) {
        return StringUtils.hasText(bearerToken) && bearerToken.startsWith(GRANT_TYPE_BEARER);
    }

    public static String getTokenFromAuthorizationHeader(String authorizationHeader, String grantType) {
        return authorizationHeader.substring(grantType.length());
    }

    public static void validateBearerToken(String bearerToken) {
        Assertion.with(bearerToken)
                .setValidation(AuthorizationTokenUtils::isValidBearerToken)
                .validateOrThrow(() -> new IllegalArgumentException("유효한 Bearer 토큰이 아닙니다."));

    }
}
