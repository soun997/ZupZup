package com.twoez.zupzup.config.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "refresh", timeToLive = 1209600)
public class RefreshToken {

    @Id
    private String id;
    @Indexed
    private String memberId;
    private String token;

    public static RefreshToken from(Long memberId, AuthorizationToken authorizationToken) {
        return new RefreshToken(null, String.valueOf(memberId), authorizationToken.getRefreshToken());
    }

}
