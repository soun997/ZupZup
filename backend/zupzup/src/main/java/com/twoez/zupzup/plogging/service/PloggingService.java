package com.twoez.zupzup.plogging.service;


import com.twoez.zupzup.plogging.repository.redis.PloggingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PloggingService {

    private final PloggingRedisRepository ploggingRedisRepository;

    public Long increaseTotalPlogger() {

        return ploggingRedisRepository.increase();
    }

    public Long decreaseTotalPlogger() {

        return ploggingRedisRepository.decrease();
    }

    public Long searchTotalPlogger() {

        return ploggingRedisRepository.findTotalPlogger();
    }
}
