package com.twoez.zupzup.plogginglog.controller;


import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.fixture.plogginglog.RouteFixture;
import com.twoez.zupzup.plogginglog.controller.dto.request.RouteAddRequest;
import com.twoez.zupzup.plogginglog.domain.Route;
import com.twoez.zupzup.plogginglog.service.RouteService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(RouteController.class)
public class RouteControllerTest extends RestDocsTest {

    @MockBean
    RouteService routeService;

    @Test
    @DisplayName("사용자는 플로깅 종료 후, 플로깅 이동 경로를 저장할 수 있다.")
    void routeAddTest() throws Exception {

        RouteAddRequest request = RouteFixture.DEFAULT.getRouteAddRequest();

        ResultActions perform = mockMvc.perform(
                post("/api/v1/routes/{ploggingLogId}", 1L)
                        .contextPath("/api")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(request)));

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.CREATED.value()));

        perform.andDo(print())
                .andDo(document("route-add",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("ploggingLogId").description("플로깅 기록 ID"))));
    }

    @Test
    @DisplayName("사용자는 자신의 플로깅 이동 경로를 조회할 수 있다.")
    void routeDetailsTest() throws Exception {

        Route route = RouteFixture.DEFAULT.getRoute();
        given(routeService.searchRoute(1L))
                .willReturn(route);

        ResultActions perform = mockMvc.perform(
                get("/api/v1/routes/{ploggingLogId}", 1L)
                        .contextPath("/api")
                        .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.results.locations.length()")
                        .value(route.getLocations().size()));

        perform.andDo(print())
                .andDo(document("route-details",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("ploggingLogId").description("플로깅 기록 ID"))));
    }
}
