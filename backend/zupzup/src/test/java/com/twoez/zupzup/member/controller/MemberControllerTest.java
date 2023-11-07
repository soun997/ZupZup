package com.twoez.zupzup.member.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.fixture.member.AuthorizationTokenFixture;
import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.controller.dto.MemberHealthModifyRequest;
import com.twoez.zupzup.member.controller.dto.MemberHealthRegisterRequest;
import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.service.MemberService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(MemberController.class)
class MemberControllerTest extends RestDocsTest {

    @MockBean MemberService memberService;

    @Test
    @DisplayName("사용자는 회원가입하고 헬스정보를 등록할 수 있다.")
    void registerTest() throws Exception {
        MemberHealthRegisterRequest request
                = new MemberHealthRegisterRequest(
                        1L,
                        2000,
                        Gender.M,
                        180,
                        80);

        Member member = MemberFixture.DEFAULT.getMember();
        AuthorizationToken authorizationToken = AuthorizationTokenFixture.DEFAULT.getAuthorizationToken();

        given(memberService.issueAuthorizationToken(any(Long.class)))
                .willReturn(authorizationToken);
        given(memberService.findById(any(Long.class)))
                .willReturn(member);

        ResultActions perfrom =
                mockMvc.perform(
                        put("/api/v1/members/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(request)));

        perfrom.andExpect(status().isOk())
                .andExpect(jsonPath("$.results.memberId").value(1L))
                .andExpect(jsonPath("$.results.name").value("줍줍이"))
                .andExpect(jsonPath("$.results.accessToken").value("ACCESSTOKEN"))
                .andExpect(jsonPath("$.results.refreshToken").value("REFRESHTOKEN"));

        perfrom.andDo(print())
                .andDo(document("member-register", getDocumentRequest(),getDocumentResponse()));
    }


    @Test
    @DisplayName("사용자는 로그아웃 할 수 있다.")
    void logoutTest() throws Exception {
        Member member = MemberFixture.DEFAULT.getMember();

        ResultActions perfrom =
                mockMvc.perform(
                        post("/api/v1/members/logout"));

        perfrom.andExpect(status().isOk());

        perfrom.andDo(print())
                .andDo(document("logout", getDocumentRequest(),getDocumentResponse()));
    }


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
