package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import lombok.Builder;

@Builder
public record TotalPloggingLogDetailsResponse(
        Long totalDistance,
        Long totalCount,
        Long totalDurationTime,
        Long totalCalories,
        Long totalGatheredTrash) {

    public static TotalPloggingLogDetailsResponse from(TotalPloggingLog totalPloggingLog) {

        return TotalPloggingLogDetailsResponse.builder()
                .totalDistance(totalPloggingLog.getTotalDistance())
                .totalCount(totalPloggingLog.getTotalCount())
                .totalDurationTime(totalPloggingLog.getTotalDurationTime())
                .totalCalories(totalPloggingLog.getTotalCalories())
                .totalGatheredTrash(totalPloggingLog.getTotalGatheredTrash())
                .build();
    }
}
