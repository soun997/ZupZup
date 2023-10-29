package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import java.time.LocalDateTime;

public enum PloggingLogFixture {
    DEFAULT;
    private Long id = 1L;
    private Integer distance = 10;
    private LocalDateTime startDateTime = LocalDateTime.of(2023, 10, 30, 0, 0);
    private LocalDateTime endDateTime = LocalDateTime.of(2023, 10, 30, 2, 0);
    private Integer time = 60 * 60;
    private Integer calories = 600;
    private Integer gatheredTrash = 50;
    private Integer coin = 200;
    private String routeImageUrl = "https://image.com";
    private Boolean isDeleted = false;
    private Member member = MemberFixture.DEFAULT.getMember();

    public PloggingLog getPloggingLog() {
        return PloggingLog.builder()
                .id(id)
                .distance(distance)
                .startDateTime(startDateTime)
                .endDateTime(endDateTime)
                .time(time)
                .calories(calories)
                .gatheredTrash(gatheredTrash)
                .coin(coin)
                .routeImageUrl(routeImageUrl)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }

    public PloggingLog getPloggingLogWithPeriod(
            LocalDateTime startDateTime, LocalDateTime endDateTime, Member member) {
        return PloggingLog.builder()
                .id(id)
                .distance(distance)
                .startDateTime(startDateTime)
                .endDateTime(endDateTime)
                .time(time)
                .calories(calories)
                .gatheredTrash(gatheredTrash)
                .coin(coin)
                .routeImageUrl(routeImageUrl)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }

    public PloggingLogRequest getPloggingLogRequest() {

        return new PloggingLogRequest(
                distance, startDateTime, endDateTime,
                time, calories, gatheredTrash,
                coin, routeImageUrl);
    }
}
