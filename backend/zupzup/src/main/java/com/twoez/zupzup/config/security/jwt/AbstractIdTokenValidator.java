package com.twoez.zupzup.config.security.jwt;

import com.twoez.zupzup.config.security.exception.InvalidIdTokenException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.service.dto.OidcPublicKeyDetailResponse;
import java.util.List;
import java.util.Map;

public abstract class AbstractIdTokenValidator {

    private final JwtValidator jwtValidator;
    private final OidcProperty oidcProperty;

    public AbstractIdTokenValidator(JwtValidator jwtValidator, OidcProperty oidcProperty) {
        this.jwtValidator = jwtValidator;
        this.oidcProperty = oidcProperty;
    }

    public AuthUser extractAuthUser(String idToken) {
        // idToken의 header로 부터 kid를 가져온다.
        String kid = extractKid(idToken);

        // kid로부터 oidcPublicKey를 받아온다.
        OidcPublicKeyDetailResponse oidcPublicKey = getOidcPublicKeyByKid(kid);

        // publicKey로 payload를 얻어낸다.
        Map<String, Object> payload = jwtValidator.getPayloadFromIdToken(idToken, oidcPublicKey.n(),
                oidcPublicKey.e());

        // payload로부터 AuthUser를 얻어내서 반환한다.
        return extractUserInfo(payload);
    }

    /**
     * @param idToken
     * @return
     */
    private String extractKid(String idToken) {
        return jwtValidator.getKidFromIdToken(idToken, oidcProperty.issuer(),
                oidcProperty.audience());
    }

    /**
     * oauth provider의 공개키를 받아와(Http GET) kid에 일치하는 공개키를 반환합니다.
     *
     * @param kid
     * @return
     */
    private OidcPublicKeyDetailResponse getOidcPublicKeyByKid(String kid) {
        List<OidcPublicKeyDetailResponse> publicKeys = getOidcPublicKeys();
        return publicKeys.stream()
                .filter(key -> key.kid().equals(kid))
                .findFirst()
                .orElseThrow(
                        () -> new InvalidIdTokenException(HttpExceptionCode.ID_TOKEN_INVALID_KID));
    }

    public abstract List<OidcPublicKeyDetailResponse> getOidcPublicKeys();

    public abstract AuthUser extractUserInfo(Map<String, Object> payload);


}
