package com.twoez.zupzup.member.controller;


import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.member.HealthNotFoundException;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.controller.dto.MemberHealthCreateResponse;
import com.twoez.zupzup.member.controller.dto.MemberHealthRegisterRequest;
import com.twoez.zupzup.member.controller.dto.MemberProfileResponse;
import com.twoez.zupzup.global.util.Assertion;
import com.twoez.zupzup.member.controller.dto.*;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/register")
    public ApiResponse<MemberHealthCreateResponse> register(
            @RequestBody MemberHealthRegisterRequest memberHealthRegisterRequest) {
        Long requestedMemberId = memberHealthRegisterRequest.memberId();
        memberService.modifyMemberHealth(memberHealthRegisterRequest);
        memberService.validateMember(requestedMemberId);
        AuthorizationToken authorizationToken =
                memberService.issueAuthorizationToken(requestedMemberId);

        return ApiResponse.ok(
                MemberHealthCreateResponse.from(authorizationToken, requestedMemberId));
    }

    @GetMapping("/health")
    public ApiResponse<MemberHealthResponse> memberHealthDetails(
            @AuthenticationPrincipal LoginUser loginUser) {

        Assertion.with(loginUser.getMember())
                .setValidation(Member::hasHealthInfo)
                .validateOrThrow(
                        () -> new HealthNotFoundException(HttpExceptionCode.HEALTH_NOT_FOUND));

        return ApiResponse.ok(MemberHealthResponse.from(loginUser.getMember()));
    }

    @PutMapping("/health")
    public ApiResponse<Object> memberHealthModify(
            @RequestBody MemberHealthModifyRequest memberHealthModifyRequest,
            @AuthenticationPrincipal LoginUser loginUser) {

        memberService.modifyMemberHealth(loginUser.getMemberId(), memberHealthModifyRequest);

        return ApiResponse.noContent().build();
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(@AuthenticationPrincipal LoginUser loginUser) {
        memberService.logout(loginUser.getMemberId());
        return ApiResponse.status(HttpStatus.OK).build();
    }

    @GetMapping("/profile")
    public ApiResponse<MemberProfileResponse> memberProfileDetails(@AuthenticationPrincipal LoginUser loginUser) {

        return ApiResponse.ok(MemberProfileResponse.of(loginUser.getMember()));
    }

    // 테스트 api
    @GetMapping("/test")
    public ApiResponse<String> testtest(@AuthenticationPrincipal LoginUser loginUser) {
        log.info("test called!!");
        log.info("login user : {}", loginUser);
        return ApiResponse.ok("test success");
    }
}
