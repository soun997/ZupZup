package com.twoez.zupzup.config.security.jwt;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties("jwt")
public class JwtProperty {

    private String secretKey;
    private Integer authTokenExpiredSecond;
    private Integer accessExpiredSecond;
    private Integer refreshExpiredSecond;

    @Bean
    public Key getKey() {
        String encodedSecretKey = encodeBase64SecretKey(secretKey);
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(encodedSecretKey));
    }

    private String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }
}
