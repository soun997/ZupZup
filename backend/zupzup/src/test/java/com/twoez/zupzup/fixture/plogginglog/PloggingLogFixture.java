package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import java.time.LocalDateTime;

public enum PloggingLogFixture {
    DEFAULT(
            1L,
            10,
            LocalDateTime.of(2023, 10, 30, 0, 0),
            LocalDateTime.of(2023, 10, 30, 2, 0),
            7200,
            600,
            50,
            200,
            "https://image.com",
            false,
            MemberFixture.DEFAULT.getMember());
    private Long id;
    private Integer distance;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private Integer time;
    private Integer calories;
    private Integer gatheredTrash;
    private Integer coin;
    private String routeImageUrl;
    private Boolean isDeleted;
    private Member member;

    PloggingLogFixture(
            Long id,
            Integer distance,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime,
            Integer time,
            Integer calories,
            Integer gatheredTrash,
            Integer coin,
            String routeImageUrl,
            Boolean isDeleted,
            Member member) {
        this.id = id;
        this.distance = distance;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.time = time;
        this.calories = calories;
        this.gatheredTrash = gatheredTrash;
        this.coin = coin;
        this.routeImageUrl = routeImageUrl;
        this.isDeleted = isDeleted;
        this.member = member;
    }

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
                distance, startDateTime, endDateTime, time,
                calories, gatheredTrash, coin, routeImageUrl);
    }
}
