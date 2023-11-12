package com.twoez.zupzup.config.security.jwt;


import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.OauthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IdTokenValidator {

    private final GoogleIdTokenValidator googleIdTokenValidator;
    private final KakaoIdTokenValidator kakaoIdTokenValidator;

    public AuthUser extractAuthUser(OauthProvider oauthProvider, String idToken) {
        return switch (oauthProvider) {
            case GOOGLE -> googleIdTokenValidator.extractAuthUser(idToken);
            case KAKAO -> kakaoIdTokenValidator.extractAuthUser(idToken);
        };
    }
}
