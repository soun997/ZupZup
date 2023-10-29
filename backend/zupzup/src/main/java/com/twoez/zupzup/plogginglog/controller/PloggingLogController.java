package com.twoez.zupzup.plogginglog.controller;


import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.response.PloggingLogListResponse;
import com.twoez.zupzup.plogginglog.controller.dto.response.RecentPloggingLogResponse;
import com.twoez.zupzup.plogginglog.service.PloggingLogQueryService;
import com.twoez.zupzup.plogginglog.service.RouteService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/histories")
@RequiredArgsConstructor
public class PloggingLogController {

    private final PloggingLogQueryService ploggingLogQueryService;
    private final RouteService routeService;

    @GetMapping("/period")
    public ApiResponse<List<PloggingLogListResponse>> ploggingListByPeriod(
            @RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate) {
        return ApiResponse.ok(
                ploggingLogQueryService.searchInPeriod(startDate, endDate, 1L).stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/days")
    public ApiResponse<List<PloggingLogListResponse>> ploggingListByDay(
            @RequestParam LocalDate date) {
        return ApiResponse.ok(
                ploggingLogQueryService.searchByDate(date, 1L).stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/recent")
    public ApiResponse<RecentPloggingLogResponse> recentPloggingLogDetails() {
        return ApiResponse.ok(
                RecentPloggingLogResponse.from(
                        ploggingLogQueryService.searchRecentLog(1L)));
    }

    @PostMapping
    public ApiResponse<Long> ploggingLogAdd(@Valid PloggingLogRequest request) {

        return ApiResponse.created(
                ploggingLogQueryService.add(request.toEntity(null)).getId());
    }
}
