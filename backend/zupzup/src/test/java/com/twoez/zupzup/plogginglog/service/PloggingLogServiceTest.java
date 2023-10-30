package com.twoez.zupzup.plogginglog.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.fixture.plogginglog.PloggingLogFixture;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PloggingLogServiceTest {

    @Mock
    PloggingLogRepository ploggingLogRepository;
    @InjectMocks
    PloggingLogService ploggingLogService;

    @Test
    @DisplayName("플로깅 기록을 저장한다.")
    void addPloggingLogTest() {
        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(ploggingLogRepository.save(ploggingLog))
                .willReturn(ploggingLog);

        PloggingLog result = ploggingLogService.add(ploggingLog);

        assertThat(result).isEqualTo(ploggingLog);
    }
}
