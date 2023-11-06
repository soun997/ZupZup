package com.twoez.zupzup.member.repository.redis;


import com.twoez.zupzup.config.security.jwt.RefreshToken;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, String> {
    Optional<RefreshToken> findRefreshTokenByMemberId(String memberId);
}
