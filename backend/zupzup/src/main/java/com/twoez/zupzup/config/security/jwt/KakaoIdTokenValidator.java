package com.twoez.zupzup.config.security.jwt;


import com.twoez.zupzup.config.security.oauth.KakaoOauthProperty;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.OauthProvider;
import com.twoez.zupzup.member.exception.OidcPublicKeyFeignException;
import com.twoez.zupzup.member.service.client.KakaoOauthClient;
import com.twoez.zupzup.member.service.dto.OidcPublicKeyList;
import feign.FeignException;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class KakaoIdTokenValidator extends AbstractIdTokenValidator {

    private static final String KAKAO_ID_KEY = "sub";
    private static final String KAKAO_NAME_KEY = "nickname";

    private final KakaoOauthClient kakaoOauthClient;

    public KakaoIdTokenValidator(
            JwtValidator jwtValidator,
            KakaoOauthProperty kakaoOauthProperty,
            KakaoOauthClient kakaoOauthClient) {
        super(jwtValidator, kakaoOauthProperty.toOidcProperty());
        this.kakaoOauthClient = kakaoOauthClient;
    }

    @Override
    public OidcPublicKeyList getOidcPublicKeys() {
        try {
            return kakaoOauthClient.getKakaoOidcPublicKeys();
        } catch (FeignException e) {
            e.printStackTrace();
            throw new OidcPublicKeyFeignException();
        }
    }

    @Override
    public AuthUser extractUserInfo(Map<String, Object> payload) {
        String oauthAccount = (String) payload.get(KAKAO_ID_KEY);
        String userName = (String) payload.get(KAKAO_NAME_KEY);
        return AuthUser.builder()
                .oauthProvider(OauthProvider.KAKAO)
                .oauthAccount(oauthAccount)
                .name(userName)
                .build();
    }
}
