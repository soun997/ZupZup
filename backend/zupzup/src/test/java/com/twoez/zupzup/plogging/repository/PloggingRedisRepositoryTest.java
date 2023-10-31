package com.twoez.zupzup.plogging.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.twoez.zupzup.plogging.domain.Plogger;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PloggingRedisRepositoryTest {

    @Autowired PloggingRedisRepository ploggingRedisRepository;
    private static final String TOTAL_PLOGGER = "total_plogger";

    @Test
    @DisplayName("플로거 현황을 조회한다.")
    void findByIdTest() throws Exception {
        Plogger plogger = new Plogger(TOTAL_PLOGGER, 1L);
        ploggingRedisRepository.save(plogger);

        Plogger result = ploggingRedisRepository.findById(plogger.getId()).orElseThrow();

        assertThat(result.getId()).isEqualTo(plogger.getId());
        assertThat(result.getTotal()).isEqualTo(plogger.getTotal());
    }
}
