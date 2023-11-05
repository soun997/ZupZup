package com.twoez.zupzup.config.security.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.util.AuthorizationTokenUtils;
import com.twoez.zupzup.global.util.ExceptionResponseWriter;
import com.twoez.zupzup.global.util.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final Long MEMBER_ID_FOR_INVALID_TOKEN = -1L;
    private static final Long MEMBER_ID_FOR_MALFORMED_TOKEN = -2L;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        try {
            // 이후 필터들에서 발생한 예외를 잡아서 처리한다.
            filterChain.doFilter(request, response);
        } catch (ApplicationException e) {
            logRequestInfo(request);
            log.info("[ERROR - security filter] {}", e.getExceptionCode().getMessage());
            e.printStackTrace();
            ExceptionResponseWriter.writeException(response, e.getExceptionCode());
        } catch (Exception e) {
            logRequestInfo(request);
            log.info("[ERROR - security filter] {}", e.getMessage());
            e.printStackTrace();
            ExceptionResponseWriter.writeException(response, e.getMessage());
        }
    }

    private void logRequestInfo(HttpServletRequest request) {
        log.info(
                "[Request] {} {} by memberId {}",
                request.getMethod(),
                request.getRequestURI(),
                getRequestMemberIdFromHeader(request));
    }

    private Long getRequestMemberIdFromHeader(HttpServletRequest request) {
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
    private String getBearerTokenFromHeader(HttpServletRequest request) {
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
