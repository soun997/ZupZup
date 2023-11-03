package com.twoez.zupzup.config.redis;

import com.twoez.zupzup.plogging.repository.redis.PloggingRedisRepository;
import java.util.Map;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class KeyChain {

    private Map<Class<?>, String> keyChain =
            Map.of(PloggingRedisRepository.class, "TOTAL_PLOGGER");

    public String getKey(Class<?> clazz) {
        return keyChain.get(clazz);
    }
}
