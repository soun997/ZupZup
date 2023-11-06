package com.twoez.zupzup.config.security.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twoez.zupzup.global.util.AuthorizationTokenUtils;
import com.twoez.zupzup.global.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;

public class HttpRequestUtils {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final Long MEMBER_ID_FOR_INVALID_TOKEN = -1L;
    private static final Long MEMBER_ID_FOR_MALFORMED_TOKEN = -2L;
    public static Long getRequestMemberIdFromHeader(HttpServletRequest request) {
        Optional<String> tokenOptional = Optional.ofNullable(getBearerTokenFromHeader(request));
        return tokenOptional.map((token) -> {
            try {
                return JwtUtils.getSubject(token).asLong();
            } catch (JsonProcessingException e) {
                return MEMBER_ID_FOR_MALFORMED_TOKEN;
            }
        }).orElse(MEMBER_ID_FOR_INVALID_TOKEN);
    }

    /**
     * 유효한 BearerToken이 있을 경우 Token값을 반환합니다. 그렇지 않을 경우 null을 반환합니다.
     * @param request
     * @return
     */
    private static String getBearerTokenFromHeader(HttpServletRequest request) {
        Optional<String> bearerTokenOptional = Optional.ofNullable(
                request.getHeader(AUTHORIZATION_HEADER));
        if (bearerTokenOptional.isEmpty()) {
            return null;
        }

        String bearerToken = bearerTokenOptional.get();
        try {
            AuthorizationTokenUtils.validateBearerToken(bearerToken);
        } catch (IllegalArgumentException e) {
            return null;
        }

        return AuthorizationTokenUtils.getTokenFromAuthorizationHeader(
                bearerToken, AuthorizationTokenUtils.GRANT_TYPE_BEARER
        );
    }

}
