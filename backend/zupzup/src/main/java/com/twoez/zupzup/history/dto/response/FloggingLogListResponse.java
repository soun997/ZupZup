package com.twoez.zupzup.history.dto.response;

import com.twoez.zupzup.history.domain.FloggingLog;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record FloggingLogListResponse(LocalDateTime startDateTime,
                                      LocalDateTime endDateTime,
                                      Integer distance,
                                      Integer calories,
                                      String routeImageUrl) {

    public static FloggingLogListResponse from(FloggingLog floggingLog) {
        return FloggingLogListResponse.builder()
                .startDateTime(floggingLog.getStartDateTime())
                .endDateTime(floggingLog.getEndDateTime())
                .distance(floggingLog.getDistance())
                .calories(floggingLog.getCalories())
                .routeImageUrl(floggingLog.getRouteImageUrl())
                .build();
    }
}
