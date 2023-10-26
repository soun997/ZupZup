package com.twoez.zupzup.plogginglog.controller.dto.request;


import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record PloggingLogRequest(
        @NotNull Integer distance,
        @NotNull LocalDateTime startDateTime,
        @NotNull LocalDateTime endDateTime,
        @NotNull Long time,
        @NotNull Integer calories,
        @NotNull Integer gatheredTrash,
        @NotNull Integer coins,
        @NotNull String routeImageUrl) {

    public PloggingLog toEntity(Member member) {
        return PloggingLog.builder()
                .distance(distance)
                .startDateTime(startDateTime)
                .endDateTime(endDateTime)
                .time(time)
                .calories(calories)
                .gatheredTrash(gatheredTrash)
                .coins(coins)
                .routeImageUrl(routeImageUrl)
                .member(member)
                .build();
    }
}
