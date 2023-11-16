package com.twoez.zupzup.plogging.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.fixture.plogging.PloggingFixture;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.plogging.domain.Plogging;
import com.twoez.zupzup.plogging.repository.redis.PloggingRedisRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PloggingServiceTest {

    @Mock PloggingRedisRepository ploggingRedisRepository;
    @Mock MemberRepository memberRepository;
    @InjectMocks PloggingService ploggingService;

    @Test
    @DisplayName("현재 플로거를 1명 증가시킨다.")
    void increaseTotalPloggerTest() {

        Long total = 0L;
        Plogging plogging = PloggingFixture.DEFAULT.getPlogging();
        ploggingRedisRepository.save(plogging);
        given(ploggingRedisRepository.count()).willReturn(total + 1);

        Long result = ploggingService.add(1L);

        assertThat(result).isEqualTo(1L);
    }

    @Test
    @DisplayName("현재 플로거를 1명 감소시킨다.")
    void decreaseTotalPloggerTest() {

        Long total = 1L;

        Plogging plogging = PloggingFixture.DEFAULT.getPlogging();

        given(ploggingRedisRepository.count()).willReturn(total - 1L);
        given(ploggingRedisRepository.findById(any())).willReturn(Optional.of(plogging));

        Long result = ploggingService.remove(any());

        assertThat(result).isZero();
    }
}
