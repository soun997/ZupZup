package com.twoez.zupzup.config.security.filter;


import com.twoez.zupzup.config.security.exception.InvalidAuthorizationHeaderException;
import com.twoez.zupzup.config.security.exception.InvalidAuthorizationTokenException;
import com.twoez.zupzup.config.security.jwt.JwtValidator;
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
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";

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
                            setAuthenticationInSecurityContext(token, response);
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
                bearerToken, AuthorizationTokenUtils.GRANT_TYPE_BEARER
        );
    }

    private void setAuthenticationInSecurityContext(String token, HttpServletResponse response) {
        // TODO : refresh 요청일 경우 만료에 대한 검증은 하지 않음

        // accessToken의 유효성 검증 + subject인 memberId 가져오기
        Long memberIdInAccessToken = jwtValidator.getMemberIdFromAccessToken(token);

        // TODO : BlackList 검증 for Block request after logout

        // TODO : 예외 write
        LoginUser loginUser =
                loginUserMapper.toLoginUser(memberService.findById(memberIdInAccessToken));

        SecurityContextHolder.getContext()
                .setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                loginUser, "", loginUser.getAuthorities()));
    }

    // TODO : 이 로직은 수정해서 AuthController로 보내야함
    private void validateRefreshToken(Long memberId) {
        Assertion.with(memberId)
                .setValidation(memberService::hasValidRefreshToken)
                .validateOrThrow(() -> new InvalidAuthorizationTokenException(
                        HttpExceptionCode.AUTHORIZATION_TOKEN_EXPIRED_EXCEPTION));
    }
}
