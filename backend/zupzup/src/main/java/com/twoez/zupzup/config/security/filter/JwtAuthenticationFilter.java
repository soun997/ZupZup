package com.twoez.zupzup.config.security.filter;


import com.twoez.zupzup.config.security.exception.ExpiredAuthorizationTokenException;
import com.twoez.zupzup.config.security.exception.InvalidAuthorizationHeaderException;
import com.twoez.zupzup.config.security.exception.InvalidAuthorizationTokenException;
import com.twoez.zupzup.config.security.jwt.ExpiredTokenUser;
import com.twoez.zupzup.config.security.jwt.JwtValidator;
import com.twoez.zupzup.config.security.user.RequestUser;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.util.Assertion;
import com.twoez.zupzup.global.util.AuthorizationTokenUtils;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.member.domain.mapper.LoginUserMapper;
import com.twoez.zupzup.member.service.MemberService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String RE_ISSUE_TOKEN_URI = "/api/v1/auth/re-issue";

    private final JwtValidator jwtValidator;
    private final MemberService memberService;
    private final LoginUserMapper loginUserMapper;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.info("[Filter - START] JwtAuthFilter - {}", request.getRequestURI());

        // 1. Bearer 토큰 검증
        // 2. AccessToken 검증
        // 3. accessToken에서 Id 뽑아서 db에 저장된 유저 정보 검색
        // 4. 유저 정보를 LoginUser에 매핑
        // 5. LoginUser로 Authentication을 만들어서 Security Context에 저장

        getTokenFromHeader(request)
                .ifPresent(
                        (bearerToken) -> {
                            String token = validateBearerToken(bearerToken);
                            setAuthenticationInSecurityContext(request, token);
                        });

        doFilter(request, response, filterChain);
        log.info("[Filter - END] JwtAuthFilter");
    }

    private Optional<String> getTokenFromHeader(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER));
    }

    private String validateBearerToken(String bearerToken) {
        try {
            AuthorizationTokenUtils.validateBearerToken(bearerToken);
        } catch (IllegalArgumentException e) {
            throw new InvalidAuthorizationHeaderException();
        }

        return AuthorizationTokenUtils.getTokenFromAuthorizationHeader(
                bearerToken, AuthorizationTokenUtils.GRANT_TYPE_BEARER);
    }

    private void setAuthenticationInSecurityContext(HttpServletRequest request, String token) {

        // TODO : BlackList 검증 for Block request after logout

        // TODO : 예외 write
        RequestUser requestUser = getRequestUserFromToken(request, token);

        SecurityContextHolder.getContext()
                .setAuthentication(convertToAuthenticationToken(request, requestUser));
    }

    private UsernamePasswordAuthenticationToken convertToAuthenticationToken(
            HttpServletRequest request, RequestUser requestUser) {
        String requestUri = request.getRequestURI();
        if (requestUri.equals(RE_ISSUE_TOKEN_URI)) {
            return new UsernamePasswordAuthenticationToken(requestUser, "", new ArrayList<>());
        }
        LoginUser loginUser = (LoginUser) requestUser;
        return new UsernamePasswordAuthenticationToken(loginUser, "", loginUser.getAuthorities());
    }

    /**
     * accessToken을 받아 RequestUser를 반환합니다. 만약 accessToken이 만료되지 않은 유효한 Token이라면 LoginUser를 반환하고 만료된
     * 토큰이고 토큰 재발급 요청이라면 ExpiredTokenUser를 반환합니다.
     *
     * @param request
     * @param token accessToken
     * @return
     */
    private RequestUser getRequestUserFromToken(HttpServletRequest request, String token) {
        String requestUri = request.getRequestURI();
        Long memberIdInAccessToken;

        try {
            memberIdInAccessToken = jwtValidator.getMemberIdFromAccessToken(token);
            return loginUserMapper.toLoginUser(memberService.findById(memberIdInAccessToken));
        } catch (ExpiredAuthorizationTokenException e) {
            log.info("[JWT AUTH Filter] Expired JWT");
            if (requestUri.equals(RE_ISSUE_TOKEN_URI)) {
                log.info("[JWT AUTH Filter] Expired JWT - re-issue");
                memberIdInAccessToken = HttpRequestUtils.getRequestMemberIdFromHeader(request);
                return new ExpiredTokenUser(memberIdInAccessToken);
            }
            throw e;
        }
    }

    // TODO : 이 로직은 수정해서 AuthController로 보내야함
    private void validateRefreshToken(Long memberId) {
        Assertion.with(memberId)
                .setValidation(memberService::hasValidRefreshToken)
                .validateOrThrow(
                        () ->
                                new InvalidAuthorizationTokenException(
                                        HttpExceptionCode.AUTHORIZATION_TOKEN_EXPIRED_EXCEPTION));
    }
}
