package com.twoez.zupzup.plogginglog.controller;


import com.twoez.zupzup.global.response.ApiContent;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.global.response.HttpResponse;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.plogginglog.controller.dto.request.LogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.response.*;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.HttpResource;

@RestController
@RequestMapping("api/v1/plogging-logs")
@RequiredArgsConstructor
public class PloggingLogController {

    private final PloggingLogQueryService ploggingLogQueryService;
    private final PloggingLogService ploggingLogService;

    @GetMapping("/months")
    public HttpResponse<List<PloggingLogCalendarResponse>> ploggingStatusInMonth(
            @RequestParam LocalDate date, @AuthenticationPrincipal LoginUser loginUser) {
        return HttpResponse.okBuild(convertToCalendarResponse(
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
    public HttpResponse<List<PloggingLogListResponse>> ploggingListByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate,
            @AuthenticationPrincipal LoginUser loginUser) {
        return HttpResponse.okBuild(
                ploggingLogQueryService
                        .searchInPeriod(startDate, endDate, loginUser.getMemberId())
                        .stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/days")
    public HttpResponse<List<PloggingLogListResponse>> ploggingListByDay(
            @RequestParam LocalDate date, @AuthenticationPrincipal LoginUser loginUser) {
        return HttpResponse.okBuild(
                ploggingLogQueryService.searchByDate(date, loginUser.getMemberId()).stream()
                        .map(PloggingLogListResponse::from)
                        .toList());
    }

    @GetMapping("/recent")
    public HttpResponse<RecentPloggingLogResponse> recentPloggingLogDetails(
            @AuthenticationPrincipal LoginUser loginUser) {
        return ploggingLogQueryService.searchRecentLog(loginUser.getMemberId())
                .map(ploggingLog -> HttpResponse.okBuild(RecentPloggingLogResponse.from(ploggingLog)))
                .orElseGet(() -> HttpResponse.noContentBuilder().build());
    }

    @PostMapping
    public HttpResponse<PloggingLogAddResponse> ploggingLogAdd(
            @Validated @RequestBody PloggingLogRequest request,
            @AuthenticationPrincipal LoginUser loginUser) {

        return HttpResponse.createdBuild(
                PloggingLogAddResponse.from(
                        ploggingLogService.add(request, loginUser.getMember().getId())));
    }

    @GetMapping("/total")
    public HttpResponse<TotalPloggingLogDetailsResponse> totalPloggingLogDetails(
            @AuthenticationPrincipal LoginUser loginUser) {

        return HttpResponse.okBuild(
                TotalPloggingLogDetailsResponse.from(
                        ploggingLogQueryService.searchTotalPloggingLog(loginUser.getMember())));
    }
}
