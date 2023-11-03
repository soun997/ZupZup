package com.twoez.zupzup.plogging.repository.redis;

import com.twoez.zupzup.config.redis.KeyChain;
import com.twoez.zupzup.global.util.JsonConverter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@RequiredArgsConstructor
@Repository
public class PloggingRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    private final KeyChain keyChain;

    public Long increase() {

        return clamp(redisTemplate.opsForValue()
                .increment(keyChain.getKey(PloggingRedisRepository.class)));
    }

    public Long decrease() {

        return clamp(redisTemplate.opsForValue()
                .decrement(keyChain.getKey(PloggingRedisRepository.class)));
    }

    public Long findTotalPlogger() {
        return Optional.ofNullable(redisTemplate.opsForValue().get(
                        keyChain.getKey(PloggingRedisRepository.class)))
                .map(total -> JsonConverter.toObject(total, Long.class))
                .orElse(0L);
    }

    public Long clamp(Long origin) {

        if (origin < 0) {
            redisTemplate.opsForValue().set(
                    keyChain.getKey(PloggingRedisRepository.class),
                    String.valueOf(0L));
            return 0L;
        }

        if (origin > Long.MAX_VALUE - 1) {
            redisTemplate.opsForValue().set(
                    keyChain.getKey(PloggingRedisRepository.class),
                    String.valueOf(Long.MAX_VALUE - 1));
            return Long.MAX_VALUE - 1;
        }

        return origin;
    }
}
