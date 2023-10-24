package com.twoez.zupzup.history.dto.response;

import com.twoez.zupzup.history.domain.FloggingLog;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record RecentFloggingLogResponse(LocalDateTime startDateTime,
                                        LocalDateTime endDateTime,
                                        Integer distance,
                                        Integer calories) {

    public static RecentFloggingLogResponse from(FloggingLog floggingLog) {
        return RecentFloggingLogResponse.builder()
                .startDateTime(floggingLog.getStartDateTime())
                .endDateTime(floggingLog.getEndDateTime())
                .distance(floggingLog.getDistance())
                .calories(floggingLog.getCalories())
                .build();
    }
}
