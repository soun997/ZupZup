package com.twoez.zupzup.member.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.config.security.exception.InvalidAuthorizationTokenException;
import com.twoez.zupzup.config.security.exception.InvalidIdTokenException;
import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.member.controller.dto.AuthRequest;
import com.twoez.zupzup.member.controller.dto.ReissueTokenRequest;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.OauthProvider;
import com.twoez.zupzup.member.service.IdTokenService;
import com.twoez.zupzup.member.service.MemberService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(AuthController.class)
class AuthControllerTest extends RestDocsTest {

    @MockBean IdTokenService idTokenService;
    @MockBean MemberService memberService;

    @Test
    @DisplayName("사용자 인가 테스트")
    void authorizeUserTest() throws Exception {
        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        AuthUser authUser = new AuthUser(OauthProvider.GOOGLE, "1234567890", "귄카");
        Member member = MemberFixture.DEFAULT.getMember();
        AuthorizationToken authorizationToken =
                new AuthorizationToken("1234567890", "1234567890", "Bearer");

        given(idTokenService.extractAuthUser(any(AuthRequest.class))).willReturn(authUser);
        given(memberService.findMemberByOauth(any(AuthUser.class))).willReturn(Optional.of(member));
        given(memberService.issueAuthorizationToken(anyLong())).willReturn(authorizationToken);
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));

        perform.andExpect(status().isOk());
        perform.andDo(print())
                .andDo(document("authroize-user", getDocumentRequest(), getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - token kid 존재하지 않음")
    void authorizeUserFailKidNotFoundTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidIdTokenException(HttpExceptionCode.ID_TOKEN_KID_NOT_FOUND));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-kid-notfound", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 유효하지 않은 token kid")
    void authorizeUserFailKidInvalidTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidIdTokenException(HttpExceptionCode.ID_TOKEN_INVALID_KID));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-kid-invalid", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 지원되지 않는 jwt")
    void authorizeUserFailJwtUnsupportedTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidIdTokenException(HttpExceptionCode.JWT_UNSUPPORTED));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-jwt-unsupported", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 만료된 jwt")
    void authorizeUserFailJwtExpiredTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidAuthorizationTokenException(HttpExceptionCode.JWT_EXPIRED));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-jwt-expired", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 손상된 jwt")
    void authorizeUserFailJwtMalformedTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidAuthorizationTokenException(HttpExceptionCode.JWT_MALFORMED));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-jwt-malformed", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 유효하지 않은 jwt signature")
    void authorizeUserFailJwtInvalidSigTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidIdTokenException(HttpExceptionCode.JWT_INVALID_SIGNATURE));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-jwt-invalid-sig", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 인가 실패 - 출처 불분명 jwt 오류")
    void authorizeUserFailAllTest() throws Exception {

        AuthRequest authRequest = new AuthRequest(OauthProvider.GOOGLE, "1234567890");
        given(idTokenService.extractAuthUser(any(AuthRequest.class)))
                .willThrow(new InvalidIdTokenException(HttpExceptionCode.JWT_NOT_FOUND));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(authRequest)));
        perform.andExpect(status().isUnauthorized());
        perform.andDo(print())
                .andDo(document("authroize-user-fail-jwt-all", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 재인가 테스트")
    void reIssueAuthorizationTokenTest() throws Exception {

        Member member = MemberFixture.DEFAULT.getMember();
        ReissueTokenRequest reissueTokenRequest = new ReissueTokenRequest("1234567890");
        AuthorizationToken authorizationToken =
                new AuthorizationToken("1234567890", "1234567890", "Bearer");
        given(memberService.reIssueAuthorizationToken(anyLong(), any(ReissueTokenRequest.class)))
                .willReturn(authorizationToken);
        given(memberService.findById(anyLong())).willReturn(member);

        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth/re-issue")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(reissueTokenRequest)));

        perform.andExpect(status().isOk());
        perform.andDo(print())
                .andDo(document("reissue", getDocumentRequest(), getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 재인가 실패 - refresh token not found")
    void reIssueAuthorizationTokenFailNotFoundTest() throws Exception {

        ReissueTokenRequest reissueTokenRequest = new ReissueTokenRequest("1234567890");
        given(memberService.reIssueAuthorizationToken(anyLong(), any(ReissueTokenRequest.class)))
                .willThrow(
                        new InvalidAuthorizationTokenException(
                                HttpExceptionCode.REFRESH_TOKEN_NOT_FOUND));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth/re-issue")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(reissueTokenRequest)));

        perform.andExpect(status().isNotFound());
        perform.andDo(print()).andDo(document("reissue-fail-not-found", getDocumentResponse()));
    }

    @Test
    @DisplayName("사용자 재인가 실패 - refresh token invalid")
    void reIssueAuthorizationTokenFailInvalidTest() throws Exception {

        ReissueTokenRequest reissueTokenRequest = new ReissueTokenRequest("1234567890");
        given(memberService.reIssueAuthorizationToken(anyLong(), any(ReissueTokenRequest.class)))
                .willThrow(
                        new InvalidAuthorizationTokenException(
                                HttpExceptionCode.INVALID_REFRESH_TOKEN));
        ResultActions perform =
                mockMvc.perform(
                        post("/api/v1/auth/re-issue")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(reissueTokenRequest)));

        perform.andExpect(status().isBadRequest());
        perform.andDo(print()).andDo(document("reissue-fail-invalid", getDocumentResponse()));
    }
}
