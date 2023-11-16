package com.twoez.zupzup.plogginglog.controller.dto.request;


import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record PloggingLogRequest(
        @NotNull @Min(0) Integer distance,
        @NotNull LocalDateTime startDateTime,
        @NotNull LocalDateTime endDateTime,
        @NotNull @Min(0) Integer durationTime,
        @NotNull @Min(0) Integer calories,
        @NotNull @Min(0) Integer gatheredTrash,
        @NotNull @Min(0) Integer coin,
        @NotBlank String routeImageUrl) {

    public PloggingLog toEntity(Member member) {
        return PloggingLog.builder()
                .distance(distance)
                .startDateTime(startDateTime)
                .endDateTime(endDateTime)
                .durationTime(durationTime)
                .calories(calories)
                .gatheredTrash(gatheredTrash)
                .coin(coin)
                .routeImageUrl(routeImageUrl)
                .isDeleted(false)
                .member(member)
                .build();
    }
}
