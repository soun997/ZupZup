package com.twoez.zupzup.plogginglog.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.fixture.plogginglog.PloggingLogFixture;
import com.twoez.zupzup.fixture.plogginglog.TotalPloggingLogFixture;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.flogginglog.TotalPloggingLogNotFoundException;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.plogginglog.controller.dto.request.LogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.TrashRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.service.PloggingLogQueryService;
import com.twoez.zupzup.plogginglog.service.PloggingLogService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(PloggingLogController.class)
class PloggingLogControllerTest extends RestDocsTest {

    @MockBean PloggingLogQueryService ploggingLogQueryService;
    @MockBean PloggingLogService ploggingLogService;
    Member member;

    @BeforeEach
    void initObjects() {
        this.member = MemberFixture.DEFAULT.getMember();
    }

    @Test
    @DisplayName("특정 월의 플로깅 기록을 조회한다.")
    void ploggingLogByMonth() throws Exception {
        LocalDate date1 = LocalDate.of(2023, 10, 1);
        LocalDate date2 = LocalDate.of(2023, 10, 3);
        LocalDate date3 = LocalDate.of(2023, 10, 6);
        given(ploggingLogQueryService.searchInMonthDistinct(any(LocalDate.class), any(Long.class)))
                .willReturn(Map.of(date1, true, date2, true, date3, true));

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/months")
                                .queryParam("date", LocalDate.of(2023, 10, 1).toString())
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-by-month",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(parameterWithName("date").description("조회 월"))));
    }

    @Test
    @DisplayName("특정 기간의 플로깅 기록을 조회한다.")
    void ploggingLogByStartDateAndEndDate() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now, member);
        given(
                        ploggingLogQueryService.searchInPeriod(
                                any(LocalDateTime.class),
                                any(LocalDateTime.class),
                                any(Long.class)))
                .willReturn(List.of(ploggingLog));

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/period")
                                .queryParam(
                                        "startDate", LocalDateTime.of(2023, 10, 1, 0, 0).toString())
                                .queryParam(
                                        "endDate", LocalDateTime.of(2023, 10, 3, 0, 0).toString())
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-by-period",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(
                                        parameterWithName("startDate").description("시작 시간"),
                                        parameterWithName("endDate").description("종료 시간"))));
    }

    @Test
    @DisplayName("특정 일의 플로깅 기록을 조회한다.")
    void ploggingLogByDate() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now, member);
        given(ploggingLogQueryService.searchByDate(any(LocalDate.class), any(Long.class)))
                .willReturn(List.of(ploggingLog));

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/days")
                                .queryParam("date", LocalDate.of(2023, 10, 1).toString())
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-by-date",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(parameterWithName("date").description("조회일"))));
    }

    @Test
    @DisplayName("최근 플로깅 기록을 조회한다.")
    void recentPloggingLog() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now, member);
        given(ploggingLogQueryService.searchRecentLog(any(Long.class))).willReturn(ploggingLog);

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/recent")
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-by-recent",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }

    @Test
    @DisplayName("플로깅 종료 시 해당 플로깅에 대한 기록을 저장한다.")
    void ploggingLogAddTest() throws Exception {

        PloggingLogRequest ploggingLogRequest =
                new PloggingLogRequest(
                        10,
                        LocalDateTime.of(2023, 10, 30, 0, 0),
                        LocalDateTime.of(2023, 10, 30, 2, 0),
                        7200,
                        600,
                        50,
                        200,
                        "https://image.com");
        TrashRequest trashRequest = new TrashRequest(1, 2, 3, 4, 5, 6, 7, 8, 9);

        LogRequest request = new LogRequest(ploggingLogRequest, trashRequest);

        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(ploggingLogService.add(any(LogRequest.class), any(Long.class)))
                .willReturn(ploggingLog);

        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/plogging-logs")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(request)));

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.CREATED.value()))
                .andExpect(jsonPath("$.results.id").value(1L));

        perform.andDo(print())
                .andDo(document("plogginglog-add", getDocumentRequest(), getDocumentResponse()));
    }

    @Test
    @DisplayName("플로깅 기록 저장 예외 - 멤버 조회 오류")
    void ploggingLogAddMemberFailTest() throws Exception {

        PloggingLogRequest ploggingLogRequest =
                new PloggingLogRequest(
                        10,
                        LocalDateTime.of(2023, 10, 30, 0, 0),
                        LocalDateTime.of(2023, 10, 30, 2, 0),
                        7200,
                        600,
                        50,
                        200,
                        "https://image.com");
        TrashRequest trashRequest = new TrashRequest(1, 2, 3, 4, 5, 6, 7, 8, 9);

        LogRequest request = new LogRequest(ploggingLogRequest, trashRequest);

        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(ploggingLogService.add(any(LogRequest.class), any(Long.class)))
                .willThrow(new MemberQueryException(HttpExceptionCode.MEMBER_NOT_FOUND));

        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/plogging-logs")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(request)));

        perform.andExpect(status().isNotFound());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-add-fail-member",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }

    @Test
    @DisplayName("플로깅 기록 저장 예외 - 플로깅 기록 집계 조회 오류")
    void ploggingLogAddTotalFailTest() throws Exception {

        PloggingLogRequest ploggingLogRequest =
                new PloggingLogRequest(
                        10,
                        LocalDateTime.of(2023, 10, 30, 0, 0),
                        LocalDateTime.of(2023, 10, 30, 2, 0),
                        7200,
                        600,
                        50,
                        200,
                        "https://image.com");
        TrashRequest trashRequest = new TrashRequest(1, 2, 3, 4, 5, 6, 7, 8, 9);

        LogRequest request = new LogRequest(ploggingLogRequest, trashRequest);

        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(ploggingLogService.add(any(LogRequest.class), any(Long.class)))
                .willThrow(new TotalPloggingLogNotFoundException());

        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/plogging-logs")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(request)));

        perform.andExpect(status().isNotFound());

        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-add-fail-total",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자는 플로깅 기록 집계를 조회할 수 있다.")
    void totalPloggingLogDetailsTest() throws Exception {

        TotalPloggingLog totalPloggingLog = TotalPloggingLogFixture.DEFAULT.getTotalPloggingLog();
        given(ploggingLogQueryService.searchTotalPloggingLog(any(Member.class)))
                .willReturn(totalPloggingLog);

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/total").contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.results.totalDistance").value(100L))
                .andExpect(jsonPath("$.results.totalCount").value(10L));
        perform.andDo(print())
                .andDo(document("plogginglog-total", getDocumentRequest(), getDocumentResponse()));
    }

    @Test
    @DisplayName("플로깅 기록 집계 조회 실패.")
    void totalPloggingLogDetailsFailTest() throws Exception {

        given(ploggingLogQueryService.searchTotalPloggingLog(any(Member.class)))
                .willThrow(new TotalPloggingLogNotFoundException());

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/plogging-logs/total").contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isNotFound());
        perform.andDo(print())
                .andDo(
                        document(
                                "plogginglog-total-fail",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }
}
