package com.twoez.zupzup.plogging.service;


import com.twoez.zupzup.plogging.domain.Plogging;
import com.twoez.zupzup.plogging.repository.redis.PloggingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PloggingService {

    private final PloggingRedisRepository ploggingRedisRepository;

    public Long add(Long memberId) {
        ploggingRedisRepository.save(Plogging.from(memberId));
        return ploggingRedisRepository.count();
    }

    public Long remove(Long memberId) {
        ploggingRedisRepository
                .findById(String.valueOf(memberId))
                .ifPresent(ploggingRedisRepository::delete);
        return ploggingRedisRepository.count();
    }

    public Long count() {
        return ploggingRedisRepository.count();
    }
}
