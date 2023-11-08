package com.twoez.zupzup.plogginglog.controller;


import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.response.PloggingLogAddResponse;
import com.twoez.zupzup.plogginglog.controller.dto.response.PloggingLogCalendarResponse;
import com.twoez.zupzup.plogginglog.controller.dto.response.PloggingLogListResponse;
import com.twoez.zupzup.plogginglog.controller.dto.response.RecentPloggingLogResponse;
import com.twoez.zupzup.plogginglog.controller.dto.response.TotalPloggingLogDetailsResponse;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.service.PloggingLogQueryService;
import com.twoez.zupzup.plogginglog.service.PloggingLogService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/plogging-logs")
@RequiredArgsConstructor
public class PloggingLogController {

    private final PloggingLogQueryService ploggingLogQueryService;
    private final PloggingLogService ploggingLogService;

    @GetMapping("/months")
    public ApiResponse<List<PloggingLogCalendarResponse>> ploggingStatusInMonth(
            @RequestParam LocalDate date, @AuthenticationPrincipal LoginUser loginUser) {
        return ApiResponse.ok(
                convertToCalendarResponse(
                        ploggingLogQueryService.searchInMonthDistinct(
                                date, loginUser.getMemberId()),
                        date));
    }

    private List<PloggingLogCalendarResponse> convertToCalendarResponse(
            Map<LocalDate, Boolean> dates, LocalDate date) {
        LocalDate startDate = getFirstDateOfMonth(date);
        LocalDate endDate = getFirstDateOfNextMonth(startDate);

        return startDate
                .datesUntil(endDate)
                .map(
                        d -> {
                            if (dates.containsKey(d)) {
                                return new PloggingLogCalendarResponse(d, true);
                            }
                            return new PloggingLogCalendarResponse(d, false);
                        })
                .toList();
    }

    private static LocalDate getFirstDateOfMonth(LocalDate date) {
        return LocalDate.of(date.getYear(), date.getMonth(), 1);
    }

    private static LocalDate getFirstDateOfNextMonth(LocalDate startDate) {
        return startDate.plusMonths(1).with(TemporalAdjusters.firstDayOfMonth());
    }

    @GetMapping("/period")
    public ApiResponse<List<PloggingLogListResponse>> ploggingListByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate,
            @AuthenticationPrincipal LoginUser loginUser) {
        return ApiResponse.ok(
                ploggingLogQueryService
                        .searchInPeriod(startDate, endDate, loginUser.getMemberId())
                        .stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/days")
    public ApiResponse<List<PloggingLogListResponse>> ploggingListByDay(
            @RequestParam LocalDate date, @AuthenticationPrincipal LoginUser loginUser) {
        return ApiResponse.ok(
                ploggingLogQueryService.searchByDate(date, loginUser.getMemberId()).stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/recent")
    public ApiResponse<RecentPloggingLogResponse> recentPloggingLogDetails(
            @AuthenticationPrincipal LoginUser loginUser) {
        Optional<PloggingLog> ploggingLogOptional =
                ploggingLogQueryService.searchRecentLog(loginUser.getMemberId());
        return ploggingLogOptional.map(ploggingLog -> ApiResponse.ok(RecentPloggingLogResponse.from(ploggingLog))).orElseGet(() -> ApiResponse.noContent().build());
    }

    @PostMapping
    public ApiResponse<PloggingLogAddResponse> ploggingLogAdd(
            @Validated @RequestBody PloggingLogRequest request,
            @AuthenticationPrincipal LoginUser loginUser) {

        return ApiResponse.created(
                PloggingLogAddResponse.from(
                        ploggingLogService.add(request, loginUser.getMember().getId())));
    }

    @GetMapping("/total")
    public ApiResponse<TotalPloggingLogDetailsResponse> totalPloggingLogDetails(
            @AuthenticationPrincipal LoginUser loginUser) {

        return ApiResponse.ok(
                TotalPloggingLogDetailsResponse.from(
                        ploggingLogQueryService.searchTotalPloggingLog(loginUser.getMember())));
    }
}
