package com.twoez.zupzup.plogging.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.plogging.repository.redis.PloggingRedisRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PloggingServiceTest {

    @Mock PloggingRedisRepository ploggingRedisRepository;
    @InjectMocks PloggingService ploggingService;

    @Test
    @DisplayName("현재 플로거를 1명 증가시킨다.")
    void increaseTotalPloggerTest() {

        Long total = 0L;
        given(ploggingRedisRepository.increase()).willReturn(total + 1L);

        Long result = ploggingService.increaseTotalPlogger();

        assertThat(result).isEqualTo(1L);
    }

    @Test
    @DisplayName("현재 플로거를 1명 감소시킨다.")
    void decreaseTotalPloggerTest() {

        Long total = 1L;
        given(ploggingRedisRepository.decrease()).willReturn(total - 1L);

        Long result = ploggingService.decreaseTotalPlogger();

        assertThat(result).isEqualTo(0L);
    }
}
