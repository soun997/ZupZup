package com.twoez.zupzup.config.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {
    private final Key secretKey;

    public JwtValidator(JwtProperty jwtProperty) {
        this.secretKey = jwtProperty.getKey();
    }

    public Claims getTokenClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


}
