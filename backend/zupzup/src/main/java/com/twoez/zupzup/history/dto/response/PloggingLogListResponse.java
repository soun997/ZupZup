package com.twoez.zupzup.history.dto.response;

import com.twoez.zupzup.history.domain.PloggingLog;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record PloggingLogListResponse(LocalDateTime startDateTime,
                                      LocalDateTime endDateTime,
                                      Integer distance,
                                      Integer calories,
                                      String routeImageUrl) {

    public static PloggingLogListResponse from(PloggingLog ploggingLog) {
        return PloggingLogListResponse.builder()
                .startDateTime(ploggingLog.getStartDateTime())
                .endDateTime(ploggingLog.getEndDateTime())
                .distance(ploggingLog.getDistance())
                .calories(ploggingLog.getCalories())
                .routeImageUrl(ploggingLog.getRouteImageUrl())
                .build();
    }
}
