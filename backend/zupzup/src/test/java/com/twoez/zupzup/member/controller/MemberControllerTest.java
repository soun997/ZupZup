package com.twoez.zupzup.member.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.member.controller.dto.MemberHealthModifyRequest;
import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.service.MemberService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(MemberController.class)
public class MemberControllerTest extends RestDocsTest {

    @MockBean MemberService memberService;

    @Test
    @DisplayName("사용자는 본인의 프로필을 조회할 수 있다.")
    void memberProfileDetailsTest() throws Exception {
        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/members/profile").contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "member-profile-details",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }

    @Test
    @DisplayName("로그인 한 사용자는 본인의 헬스 정보를 조회할 수 있다.")
    void memberHealthDetailsTest() throws Exception {

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/members/health").contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.OK.value()))
                .andExpect((jsonPath("$.results.birthYear").value(2000)))
                .andExpect((jsonPath("$.results.gender").value(Gender.M.name())))
                .andExpect((jsonPath("$.results.height").value(180)))
                .andExpect((jsonPath("$.results.weight").value(56)));

        perform.andDo(print())
                .andDo(
                        document(
                                "member-health-details",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }

    @Test
    @DisplayName("로그인 한 사용자는 본인의 헬스 정보를 갱신할 수 있다.")
    void memberHealthModifyTest() throws Exception {
        MemberHealthModifyRequest request = new MemberHealthModifyRequest(1998, Gender.M, 181, 74);

        ResultActions perform =
                mockMvc.perform(
                        put("/api/v1/members/health")
                                .content(toJson(request))
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "member-health-modify",
                                getDocumentRequest(),
                                getDocumentResponse()));
    }
}
