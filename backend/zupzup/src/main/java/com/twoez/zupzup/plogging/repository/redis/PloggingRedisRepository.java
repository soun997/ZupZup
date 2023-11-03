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

    private final Long DEFAULT = 0L;

    public Long increase() {

        return redisTemplate.opsForValue().increment(
                keyChain.getKey(PloggingRedisRepository.class));
    }

    public Long decrease() {

        return redisTemplate.opsForValue().increment(
                keyChain.getKey(PloggingRedisRepository.class));
    }

    public Long findTotalPlogger() {
        return Optional.ofNullable(redisTemplate.opsForValue().get(
                        keyChain.getKey(PloggingRedisRepository.class)))
                .map(total -> JsonConverter.toObject(total, Long.class))
                .orElseGet(this::init);
    }

    private Long init() {

        redisTemplate.opsForValue().set(
                keyChain.getKey(PloggingRedisRepository.class), String.valueOf(DEFAULT));

        return DEFAULT;
    }
}
