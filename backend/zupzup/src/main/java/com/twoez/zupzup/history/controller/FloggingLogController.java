package com.twoez.zupzup.history.controller;


import com.twoez.zupzup.history.dto.response.FloggingLogListResponse;
import com.twoez.zupzup.history.dto.response.RecentFloggingLogResponse;
import com.twoez.zupzup.history.service.FloggingLogQueryService;
import com.twoez.zupzup.global.response.ApiResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/histories")
@RequiredArgsConstructor
public class FloggingLogController {

    private final FloggingLogQueryService floggingLogQueryService;

    @GetMapping("/period")
    public ApiResponse<List<FloggingLogListResponse>> floggingListByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return ApiResponse.ok(
                floggingLogQueryService.searchInPeriod(startDate, endDate, 1L)
                        .stream()
                        .map(FloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/days")
    public ApiResponse<List<FloggingLogListResponse>> floggingListByDay(
            @RequestParam LocalDate date) {
        return ApiResponse.ok(
                floggingLogQueryService.searchByDate(date, 1L).stream()
                        .map(FloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/recent")
    public ApiResponse<RecentFloggingLogResponse> recentFloggingLogDetails() {
        return ApiResponse.ok(
                RecentFloggingLogResponse.from(floggingLogQueryService.searchRecentLog(1L)));
    }
}
