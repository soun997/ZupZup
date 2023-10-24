package com.twoez.zupzup.history.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.history.controller.FloggingLogController;
import com.twoez.zupzup.history.domain.FloggingLog;
import com.twoez.zupzup.history.service.FloggingLogQueryService;
import com.twoez.zupzup.member.domain.AuthProvider;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.OAuth;
import com.twoez.zupzup.member.domain.Role;
import com.twoez.zupzup.support.docs.RestDocsTest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(FloggingLogController.class)
class FloggingLogControllerTest extends RestDocsTest {

    @MockBean
    FloggingLogQueryService floggingLogQueryService;
    Member member;

    @BeforeEach
    void initObjects() {
        this.member = Member.builder()
                .id(1L)
                .oAuth(new OAuth(AuthProvider.GOOGLE, "1234567"))
                .name("zupzup")
                .gender("F")
                .birthYear(2002)
                .height(160)
                .weight(50)
                .coin(24L)
                .isDeleted(false)
                .role(List.of(Role.ROLE_USER))
                .build();
    }

    @Test
    @DisplayName("특정 기간의 플로깅 기록을 조회한다.")
    void floggingLogByStartDateAndEndDate() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        FloggingLog floggingLog = FloggingLog.builder()
                .startDateTime(now)
                .endDateTime(now)
                .distance(12345)
                .gatheredTrash(24)
                .coin(240L)
                .calories(240)
                .member(member)
                .routeImageUrl("https://image.com")
                .isDeleted(false)
                .build();
        given(floggingLogQueryService.searchInPeriod(any(LocalDateTime.class),
                any(LocalDateTime.class), any(Long.class)))
                .willReturn(List.of(floggingLog));

        ResultActions perform = mockMvc.perform(get("/api/v1/histories/period")
                .queryParam("startDate", LocalDateTime.of(2023, 10, 1, 0, 0).toString())
                .queryParam("endDate", LocalDateTime.of(2023, 10, 3, 0, 0).toString())
                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("flogginglog-by-period",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("startDate").description("시작 시간"),
                                parameterWithName("endDate").description("종료 시간"))));
    }

    @Test
    @DisplayName("특정 일의 플로깅 기록을 조회한다.")
    void floggingLogByDate() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        FloggingLog floggingLog = FloggingLog.builder()
                .startDateTime(now)
                .endDateTime(now)
                .distance(12345)
                .gatheredTrash(24)
                .coin(240L)
                .calories(240)
                .member(member)
                .routeImageUrl("https://image.com")
                .isDeleted(false)
                .build();
        given(floggingLogQueryService.searchByDate(any(LocalDate.class), any(Long.class)))
                .willReturn(List.of(floggingLog));

        ResultActions perform = mockMvc.perform(get("/api/v1/histories/days")
                .queryParam("date", LocalDate.of(2023, 10, 1).toString())
                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("flogginglog-by-date",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        queryParameters(
                                parameterWithName("date").description("조회일"))));
    }

    @Test
    @DisplayName("최근 플로깅 기록을 조회한다.")
    void recentFloggingLog() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        FloggingLog floggingLog = FloggingLog.builder()
                .startDateTime(now)
                .endDateTime(now)
                .distance(12345)
                .gatheredTrash(24)
                .coin(240L)
                .calories(240)
                .member(member)
                .routeImageUrl("https://image.com")
                .isDeleted(false)
                .build();
        given(floggingLogQueryService.searchRecentLog(any(Long.class)))
                .willReturn(floggingLog);

        ResultActions perform = mockMvc.perform(get("/api/v1/histories/recent")
                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("flogginglog-by-recent",
                        getDocumentRequest(),
                        getDocumentResponse()));
    }
}