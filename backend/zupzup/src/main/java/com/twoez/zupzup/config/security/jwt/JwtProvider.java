package com.twoez.zupzup.config.security.jwt;

import java.security.Key;
import org.springframework.stereotype.Component;

/**
 * 인증 완료 후 유저에 대한 token을 발급해주는 Provider
 */
@Component
public class JwtProvider {

    private static final String GRANT_TYPE = "Bearer";

    private final Key secretKey;
    private final Integer accessExpiredMin;
    private final Integer refreshExpiredDay;

    public JwtProvider(JwtProperty jwtProperty) {
        this.secretKey = jwtProperty.getKey();
        this.accessExpiredMin = jwtProperty.getAccessExpiredMin();
        this.refreshExpiredDay = jwtProperty.getRefreshExpiredDay();
    }



}
