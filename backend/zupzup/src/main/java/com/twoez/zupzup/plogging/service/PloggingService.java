package com.twoez.zupzup.plogging.service;


import com.twoez.zupzup.global.exception.plogging.PloggingNotFoundException;
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
        Plogging plogging =
                ploggingRedisRepository
                        .findById(String.valueOf(memberId))
                        .orElseThrow(PloggingNotFoundException::new);
        ploggingRedisRepository.delete(plogging);
        return ploggingRedisRepository.count();
    }

    public Long count() {
        return ploggingRedisRepository.count();
    }
}
