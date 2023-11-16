package com.twoez.zupzup.fixture.plogging;


import com.twoez.zupzup.plogging.domain.Plogging;
import java.time.LocalDateTime;

public enum PloggingFixture {
    DEFAULT(1L, LocalDateTime.now());
    private Long memberId;
    private LocalDateTime startTime;

    PloggingFixture(Long memberId, LocalDateTime startTime) {
        this.memberId = memberId;
        this.startTime = startTime;
    }

    public Plogging getPlogging() {
        return Plogging.from(memberId);
    }
}
