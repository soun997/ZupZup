package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import java.time.LocalDateTime;

public enum PloggingLogFixture {
    DEFAULT(
            1L,
            10,
            LocalDateTime.of(2023, 10, 30, 0, 0),
            LocalDateTime.of(2023, 10, 30, 2, 0),
            600,
            50,
            200L,
            "https://image.com",
            false,
            MemberFixture.DEFAULT.getMember());
    private Long id;
    private Integer distance;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private Integer calories;
    private Integer gatheredTrash;
    private Long coin;
    private String routeImageUrl;
    private Boolean isDeleted;
    private Member member;

    PloggingLogFixture(
            Long id,
            Integer distance,
            LocalDateTime startDateTime,
            LocalDateTime endDateTime,
            Integer calories,
            Integer gatheredTrash,
            Long coin,
            String routeImageUrl,
            Boolean isDeleted,
            Member member) {
        this.id = id;
        this.distance = distance;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
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
                .calories(calories)
                .gatheredTrash(gatheredTrash)
                .coin(coin)
                .routeImageUrl(routeImageUrl)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }
}
